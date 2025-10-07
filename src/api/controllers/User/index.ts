import { Router } from "express";
import UserService from ".././../../modules/User/service/UserService.ts"

const userRoutes = Router();
const userService = new UserService();

userRoutes.post("/search", (req, res) => userService.searchUser(req, res));
userRoutes.post("/create", (req, res) => userService.createUser(req, res));
userRoutes.post("/login", (req, res) => userService.login(req, res))
userRoutes.put("/update", (req, res) => userService.updateUser(req, res));
userRoutes.delete("/delete", (req, res) => userService.deleteUser(req, res));

export default userRoutes;
