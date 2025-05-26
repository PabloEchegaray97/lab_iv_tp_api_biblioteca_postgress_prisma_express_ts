import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';

const secretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

export const generateToken = (user: Usuario) => {
    return jwt.sign({ user}, secretKey, { expiresIn: '1h'})
}
