import { Request, Response } from "express";
import RankingRepository from "../repository/RankingRepository.js";

class RankingService{
    private rankingRepository: RankingRepository;

    constructor(){
        this.rankingRepository = new RankingRepository()
    }

    public async helloWorld(req: Request, res: Response): Promise<void> {
        const result = await this.rankingRepository.helloWorld("Hello World from Repository");
        res.send(result);
    };
}

export default RankingService

