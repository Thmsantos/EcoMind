import { Router } from "express";
import UserService from ".././../../modules/User/service/UserService.js"

const userRoutes = Router();
const userService = new UserService();

userRoutes.get("/helloWorld", (req, res) => userService.helloWorld(req, res));
userRoutes.post("/create", (req, res) => userService.createUser(req, res));
export default userRoutes;
