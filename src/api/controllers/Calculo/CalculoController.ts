import { Request, Response } from "express";
import CalculoService from "../../../modules/Calculo/service/CalculoService";

export default class CalculoController {
    private calculoService: CalculoService;

    constructor() {
        this.calculoService = new CalculoService();
    }

    public async createCalculo(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const createdCalculo = await this.calculoService.createCalculo(data, data.idUser);

            if (!createdCalculo) {
                res.status(400).json({ message: 'Não foi possível criar o cálculo' });
            }

            res.status(201).json({
                message: 'criado',
            })
        } catch (err) {
            console.error('Erro ao criar calculo', err)
            res.status(500).json({
                message: 'Erro ao criar calculo'
            })
        }
    }
}