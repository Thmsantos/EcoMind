import { Router } from "express";
import StatsController from "../../controllers/Stats/index.ts";

const statsRoutes = Router();
const statsController = new StatsController();

statsRoutes.get("/:idUser", (req, res) => statsController.searchStats(req, res))

export default statsRoutes;