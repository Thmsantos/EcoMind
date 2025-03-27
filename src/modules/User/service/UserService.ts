import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository.js";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async helloWorld(req: Request, res: Response): Promise<void> {
        const result = await this.userRepository.helloWorld("Hello World from Repository");
        res.send(result);
    }
}

export default UserService;


