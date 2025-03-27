import { Router } from "express";
import RankingService from "../../../modules/Ranking/service/RankingService.js"

const rankingRoutes = Router();
const rankingService = new RankingService()

rankingRoutes.get("/helloWorld", (req, res) => rankingService.helloWorld(req, res));

export default rankingRoutes;
