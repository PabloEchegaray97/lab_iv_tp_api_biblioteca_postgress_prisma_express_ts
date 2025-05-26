import bcrypt from 'bcrypt';
import prisma from './prisma.service';
import { UsuarioCreateInput, UsuarioUpdateInput } from '../models/usuario.model';
import { validatePass } from './passService';
import { generateToken } from './authService';

export class UsuarioService {
  async findAll() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true, // esta en false porque no se devuelve en la respuesta
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

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true, 
      },
    });
  }
  //login: genera token JWT y lo devuelve junto al usuario
  async login(email: string, password: string) {
    try {
      const usuario = await this.findByEmail(email);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    const passwordMatch = await validatePass(password, usuario.password);
    if (!passwordMatch) {
      throw new Error('Contraseña incorrecta');
    }
    const token = generateToken(usuario);
    return { usuario, token };
  } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  }
} 
