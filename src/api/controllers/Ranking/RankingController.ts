import { Request, Response } from "express";
import RankingService from "../../../modules/Ranking/service/RankingService";

class RankingController {
    private rankingService: RankingService;

    constructor(
        rankingService: RankingService
    ) {
        this.rankingService = rankingService
    }

    public async createRanking(req: Request, res: Response): Promise<void> {
        const { user, points } = req.body;

        const createdRanking = await this.rankingService.createRanking(
            user,
            points
        )
    }

    public async updateRanking(req: Request, res: Response): Promise<void> {
        const { user, points } = req.body;

        const updatedUser = await this.rankingService.updateRanking(
            user,
            points
        )
    }

    public async getRanking(req: Request, res: Response): Promise<void> {
        const { pip } = req.body;

        const searchedRanking = await this.rankingService.getRanking(
            pip
        )
    }
}

export default RankingController;