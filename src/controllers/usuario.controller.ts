import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

const usuarioService = new UsuarioService();

export class UsuarioController {
  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await usuarioService.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.findById(id);
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      return res.status(200).json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { nombre, email, password } = req.body;       
      if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Nombre, email y password son requeridos' });
      }
      
      const nuevoUsuario = await usuarioService.create({ nombre, email, password });
      return res.status(201).json(nuevoUsuario);
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      // si es un error de Prisma por email duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
      
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, email, password } = req.body;
      // verificar si el usuario existe
      const usuarioExistente = await usuarioService.findById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }      
      const datosActualizados = {
        ...(nombre && { nombre }),
        ...(email && { email }),
        ...(password && { password }),
      };
      if (Object.keys(datosActualizados).length === 0) {
        return res.status(400).json({ message: 'No hay datos para actualizar' });
      }
      
      const usuarioActualizado = await usuarioService.update(id, datosActualizados);
      return res.status(200).json(usuarioActualizado);
    } catch (error: any) {
      console.error('Error al actualizar usuario:', error);
      // si es un error de Prisma por email duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
      
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // verificar si el usuario existe
      const usuarioExistente = await usuarioService.findById(id);
      if (!usuarioExistente) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      await usuarioService.delete(id);
      return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { usuario, token } = await usuarioService.login(email, password);
      return res.status(200).json({ usuario, token });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        return res.status(401).json({ message: 'Credenciales inválidas email' });
      }
      if (error.message === 'Contraseña incorrecta') {
        return res.status(401).json({ message: 'Credenciales inválidas password' });
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

} 