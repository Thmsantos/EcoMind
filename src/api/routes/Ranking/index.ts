import { Router } from "express";
import { rankingController } from "../../controllers/Ranking/index.ts";

const rankingRoutes = Router();

rankingRoutes.post("/create", (req, res) => rankingController.createRanking(req, res));
rankingRoutes.put("/update", (req, res) => rankingController.updateRanking(req, res));

export default rankingRoutes;
