import express from 'express';
type Request = express.Request;
type Response = express.Response; import UserRepository from "../repository/UserRepository.ts";
import type { UserInterface } from "../interfaces/userInterface.ts";
import User from "../User.ts";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import EmailService from "../../Email/service/emailService.ts";
import { CalculoInterface } from '../../Calculo/interfaces/CalculoInterface.ts';

class UserService {
  private userRepository: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailService = new EmailService();
  }

  public async searchUser(pip: any): Promise<UserInterface | null> {
    const user = await this.userRepository.search(pip);

    return user || null;
  }

  public async createUser(
    usuario: string,
    nome: string,
    email: string,
    senha: string,
    status: boolean,
    calculos: CalculoInterface[],
  ): Promise<void> {

    const userExists = await this.userRepository.verifyUser(usuario);
    const codigo = (Math.random() * 90000 + 10000) | 0;

    if (userExists) {

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
}

  public async updateUser(req: Request, res: Response): Promise < void> {
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
  } catch(error: any) {
    res.status(500).send({
      error: "Erro ao atualizar usuário",
      details: error.message,
    });
  }
}

  public async deleteUser(req: Request, res: Response): Promise < void> {
  try {
    const { id } = req.body;
    await this.userRepository.deleteUser(id);

    res.status(200).send({ success: true });
  } catch(error: any) {
    res.status(500).send({
      error: "Erro ao atualizar usuário",
      details: error.message,
    });
  }
}

  public async login(req: Request, res: Response): Promise < void> {
  try {
    const { usuario, senha } = req.body;

    const auth = await this.userRepository.login(senha, usuario);

    if(auth) {
      res.status(200).send({ message: 'logado', id: auth })
      return;
    }

      res.status(401).send({ message: 'login inválido' })
  } catch(error: any) {
    res.status(500).send({
      error: "Erro ao autenticar usuário",
      details: error.message,
    });
  }
}

}

export default UserService;
