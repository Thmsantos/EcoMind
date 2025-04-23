import { Router } from "express";
import CalculoService from "../../../modules/Calculo/service/CalculoService.js";

const calculoRoutes = Router();
const calculoService = new CalculoService();

calculoRoutes.post("/create", (req, res) => calculoService.createCalculo(req, res));


export default calculoRoutes;
