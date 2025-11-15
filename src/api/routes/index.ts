import express from "express";
import userRoutes from "./User/index.ts";
import calculoRoutes from "./Calculo/index.ts";
import { errorHandler } from "../../config/midlleware/errorHandler.ts"; 
import cors from "cors"
import statsRoutes from "./Stats/index.ts";
import rankingRoutes from "./Ranking/index.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/stats", statsRoutes)
app.use("/api/calculos", calculoRoutes);
app.use("/api/ranking", rankingRoutes);

app.use(errorHandler);

export default app;
