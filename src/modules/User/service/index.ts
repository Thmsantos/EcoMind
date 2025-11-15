import { userRepository } from "../repository";
import UserService from "./UserService";

export const userService = new UserService(
    userRepository
);