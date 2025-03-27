import { Router } from "express";
import UserService from ".././../../modules/User/service/UserService.js"

const userRoutes = Router();
const userService = new UserService();

userRoutes.get("/helloWorld", (req, res) => userService.helloWorld(req, res));
export default userRoutes;
