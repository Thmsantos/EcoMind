import { Request, Response } from "express";
import EstatisticasService from "../../../modules/Estatisticas/service/EstatisticasService";

export default class StatsController {
    private statsService: EstatisticasService;

    constructor() {
        this.statsService = new EstatisticasService();
    }

    public async searchStats(req: Request, res: Response): Promise<void> {
        try {
            const pip = req.body;

            const stats = await this.statsService.searchEstatisticas(pip);
            res.status(200).json({
                stats
            })
        } catch (error) {
            console.error('erro ao buscar stats', error);
            res.status(500).json({
                message: 'Erro ao buscar stats',
            })
        }
    }
}