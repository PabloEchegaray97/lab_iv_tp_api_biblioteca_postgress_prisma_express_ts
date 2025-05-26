import express, { Request, Response } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';
import { validateJWT } from '../middlewares/validateJWT';

const router = express.Router();
const controller = new UsuarioController();

router.get('/', validateJWT, async (req: Request, res: Response) => {
    await controller.getAll(req, res);
});
router.get('/:id', validateJWT, async (req: Request, res: Response) => {
    await controller.getById(req, res);
});
router.put('/:id', validateJWT,  async (req: Request, res: Response) => {
    await controller.update(req, res);
});
router.delete('/:id', validateJWT, async (req: Request, res: Response) => {
    await controller.delete(req, res);
});
router.post('/register', async (req: Request, res: Response) => {
    await controller.create(req, res);
});
router.post('/login', async (req: Request, res: Response) => {
    await controller.login(req, res);
});


export { router as usuarioRouter }; 