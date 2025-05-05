import { Router } from "express";
import EsqueciSenhaService from "../../../modules/EsqueciSenha/service/EsqueciSenhaService.js";

const esqueciSenhaRoutes = Router();
const esqueciSenhaService = new EsqueciSenhaService();

esqueciSenhaRoutes.post("/forgot", (req, res) => esqueciSenhaService.esqueciSenha(req, res));
esqueciSenhaRoutes.post("/checkCode", (req, res) => esqueciSenhaService.verificarCodigo(req, res));

export default esqueciSenhaRoutes;