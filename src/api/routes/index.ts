import express from "express";
import userRoutes from "./User/index.ts";
import rankingRoutes from "../controllers/Ranking/index.ts";
import calculoRoutes from "./Calculo/index.ts";
import esqueciSenhaRoutes from "../controllers/EsqueciSenha/index.ts";
import { errorHandler } from "../../config/midlleware/errorHandler.ts"; 
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/calculos", calculoRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/esqueciSenha", esqueciSenhaRoutes);

app.use(errorHandler);

export default app;
