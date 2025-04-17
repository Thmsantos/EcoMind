import { verify } from 'jsonwebtoken';

export const verificarToken = async (req: Request, res: Response) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
   
};