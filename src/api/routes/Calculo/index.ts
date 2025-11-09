import { Router } from "express";
import CalculoController from "../../controllers/Calculo/CalculoController.ts";

const calculoRoutes = Router();
const calculoController = new CalculoController();

calculoRoutes.post("/:idUser", (req, res) => calculoController.createCalculo(req, res));

export default calculoRoutes;
