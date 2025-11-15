import { Router } from "express";
import { userController } from "../../controllers/User";

const userRoutes = Router();

userRoutes.get("/:id", (req, res) => userController.searchUser(req, res));
userRoutes.post("/create", (req, res) => userController.createUser(req, res));
userRoutes.put("/:id", (req, res) => userController.updateUser(req, res))
userRoutes.delete("/:id", (req, res) => userController.deleteUser(req, res))
userRoutes.post("/login", (req, res) => userController.login(req, res));

export default userRoutes;
