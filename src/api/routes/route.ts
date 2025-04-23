import express from "express";
import userRoutes from "../controllers/User/index.js";
import rankingRoutes from "../controllers/Ranking/index.js"
import calculoRoutes from "../controllers/Calculo/index.js"

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/calculos", calculoRoutes);
app.use("/api/ranking", rankingRoutes);

export default app;