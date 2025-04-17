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

  public async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const user = await this.userRepository.searchUser(id);

      if (!user) {
        res.status(404).send({ error: "Usuário não encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error.message,
      });
    }
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

      await this.userRepository.createUser(userData);
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error.message,
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id, usuario, nome, email, senha, status, calculos } = req.body;

      const updatedUser: UserInterface = {
        id: new ObjectId(String(id)),
        usuario,
        nome,
        email,
        senha,
        status,
        calculos,
      };

      await this.userRepository.updateUser(
        new ObjectId(String(id)),
        updatedUser
      );
      res.status(201).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao atualizar usuário",
        details: error.message,
      });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      await this.userRepository.deleteUser(id);

      res.status(200).send({ success: true });
    } catch (error) {
      res.status(500).send({
        error: "Erro ao atualizar usuário",
        details: error.message,
      });
    }
  }
}

export default UserService;
