import { rankingService } from "../../../modules/Ranking/service";
import RankingController from "./RankingController";

export const rankingController = new RankingController(
    rankingService
)