import bcrypt from 'bcrypt';
import prisma from './prisma.service';
import { UsuarioCreateInput, UsuarioUpdateInput } from '../models/usuario.model';

export class UsuarioService {
  async findAll() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        password: false, // esta en false porque no se devuelve en la respuesta
      },
    });
  }
  async findById(id: string) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: false, // esta en false porque no se devuelve en la respuesta
      },
    });
  }
  async create(data: UsuarioCreateInput) {
    // encriptar contraseña usando bcrypt
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.usuario.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: false, // esta en false porque no se devuelve en la respuesta
      },
    });
  }
  async update(id: string, data: UsuarioUpdateInput) {
    // si se pasa una nueva contraseña, encriptarla
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.usuario.update({
      where: { id },
      data,
      select: {
        id: true,
        nombre: true,
        email: true,
        password: false, // esta en false porque no se devuelve en la respuesta
      },
    });
  }
  async delete(id: string) {
    return prisma.usuario.delete({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: false, // esta en false porque no se devuelve en la respuesta
      },
    });
  }
} 