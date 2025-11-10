import { Request, Response } from "express";
import UserService from "../../../modules/User/service/UserService";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async searchUser(req: Request, res: Response): Promise<void> {
        try {
            const pip = req.params;
            const user = await this.userService.searchUser(pip);
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Error" });
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { usuario, nome, email, senha } = req.body;

            const createdUser = await this.userService.createUser(
                usuario,
                nome,
                email,
                senha,
                true,
                []
            );

            if (!createdUser) {
                res.status(400).json({ message: "Usuário já existe." });
                return;
            }

            res.status(201).json({
                message: "Usuário criado com sucesso.",
                userId: createdUser.insertedId,
            });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            res.status(500).json({ message: "Erro interno ao criar usuário." });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;
            const user = req.body.user;

            const updatedUser = await this.userService.updateUser(user, id)
            res.status(200).json({
                message: "Usuário atualizado!",
                usuario: updatedUser
            })
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({ message: "Erro interno ao atualizar usuário." });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try{
            const id = req.params.id;

            await this.userService.deleteUser(id);
            res.status(200).json({
                message: "Usuário deletado!"
            })
        } catch(error) {
            console.error("Erro ao deletar usuário:", error);
            res.status(500).json({ message: "Erro interno ao deletar usuário." });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try{    
            const { usuario, senha } = req.body;

            const loggedUser = await this.userService.login(usuario, senha );

            if (loggedUser) {
                res.status(200).json({
                    id: loggedUser,
                    message: "Login realizado com sucesso!"
                })
                return;
            };

            res.status(401).json({
                message: "Login inváildo"
            })

        } catch(error){
            console.error('Erro ao realizar login', error)
            res.status(500).json({
                message: 'Erro ao realizar login'
            })
        }
    }
}
