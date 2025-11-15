import { rankingRepository } from "../repository";
import RankingService from "./RankingService";

export const rankingService = new RankingService(
    rankingRepository
)