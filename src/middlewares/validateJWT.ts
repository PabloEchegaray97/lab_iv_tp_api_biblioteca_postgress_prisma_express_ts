import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET_KEY || 'default_secret_key');
        return res.status(200).json({ message: 'Token validado', decoded });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}