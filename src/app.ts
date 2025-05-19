import express from 'express';
import dotenv from 'dotenv';
import { usuarioRouter } from './routes/usuario.routes';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/usuarios', usuarioRouter);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando 10/10' });
});

export default app; 