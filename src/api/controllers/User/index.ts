import { userService } from "../../../modules/User/service";
import UserController from "./UserController";

export const userController = new UserController(
    userService
)