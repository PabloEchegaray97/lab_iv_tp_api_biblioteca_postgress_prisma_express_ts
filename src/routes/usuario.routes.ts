import express, { Request, Response } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = express.Router();
const controller = new UsuarioController();

router.get('/', async (req: Request, res: Response) => {
    await controller.getAll(req, res);
});
router.get('/:id', async (req: Request, res: Response) => {
    await controller.getById(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await controller.create(req, res);
});
router.put('/:id', async (req: Request, res: Response) => {
    await controller.update(req, res);
});
router.delete('/:id', async (req: Request, res: Response) => {
    await controller.delete(req, res);
});

export { router as usuarioRouter }; 