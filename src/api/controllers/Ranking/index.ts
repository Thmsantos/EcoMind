import { Router } from "express";
import RankingService from "../../../modules/Ranking/service/RankingService.ts";

const rankingRoutes = Router();
const rankingService = new RankingService();

rankingRoutes.post("/create", (req, res) => rankingService.criarRanking(req, res));
rankingRoutes.put("/update", (req, res) => rankingService.atualizarRanking(req, res));

export default rankingRoutes;
