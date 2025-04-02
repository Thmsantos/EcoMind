import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository.js";
import { UserInterface } from "../interfaces/userInterface.js";
import User from "../User.js";
import { ObjectId } from "mongodb";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { usuario, nome, email, senha, status, calculos } = req.body;

            const user = new User(
                new ObjectId(),
                usuario,
                nome,
                email,
                senha,
                status,
                calculos
            );

            const userData: UserInterface = {
                id: user.getId(),
                usuario: user.getUsuario(),
                nome: user.getNome(),
                email: user.getEmail(),
                senha: user.getSenha(),
                status: user.getStatus(),
                calculos: user.getCalculos(),
            };

            const result = await this.userRepository.createUser(userData);
            res.status(201).send({ success: result });
        } catch (error) {
            res.status(500).send({ error: "Erro ao criar usuário" });
        }
    }
}

export default UserService;


