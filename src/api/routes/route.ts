import express from "express";
import userRoutes from "../controllers/User/index.js";
import rankingRoutes from "../controllers/Ranking/index.js";
import calculoRoutes from "../controllers/Calculo/index.js";
import esqueciSenhaRoutes from "../controllers/EsqueciSenha/index.js";

import { errorHandler } from "../../config/midlleware/errorHandler.js"; 

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/calculos", calculoRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/esqueciSenha", esqueciSenhaRoutes);

app.use(errorHandler);

export default app;
