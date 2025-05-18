import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository.js";
import { UserInterface } from "../interfaces/userInterface.js";
import User from "../User.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import EmailService from "../../Email/service/emailService.js";

class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  public async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const user = await this.userRepository.search(id);

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
      const userExists = await this.userRepository.verifyUser(usuario);
      const codigo = (Math.random() * 90000 + 10000) | 0;

      if (userExists) {
        res.status(409).json({ message: "Nome de usuário já existente" });
        return;
      }

      const criptSenha = await bcrypt.hash(senha, 10);

      const user = new User(
        usuario,
        nome,
        email,
        criptSenha,
        status,
        calculos
      );

      const userData: UserInterface = {
        usuario: user.getUsuario(),
        nome: user.getNome(),
        email: user.getEmail(),
        senha: user.getSenha(),
        status: user.getStatus(),
        calculos: user.getCalculos(),
      };

      await this.userRepository.createUser(userData);
      await this.emailService.esqueciSenha(email, String(codigo), usuario);
      res.status(201).send({ success: true });

    } catch (error) {
      res.status(500).send({
        error: "Erro ao criar usuário",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id, usuario, nome, email, senha, status, calculos } = req.body;

      const updatedUser: UserInterface = {
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

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { usuario, senha } = req.body;
      const criptSenha = await bcrypt.hash(senha, 10);

      const auth = await this.userRepository.login(criptSenha, usuario);

      if (auth) {
        res.status(200).send({ message: 'logado' })
        return;
      }

      res.status(401).send({ message: 'login inválido' })
    } catch (error) {
      res.status(500).send({
        error: "Erro ao atualizar usuário",
        details: error.message,
      });
    }
  }

}

export default UserService;
