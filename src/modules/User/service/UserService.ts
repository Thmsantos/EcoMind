import express from 'express';
type Request = express.Request;
type Response = express.Response; import UserRepository from "../repository/UserRepository.ts";
import type { UserInterface } from "../interfaces/userInterface.ts";
import User from "../User.ts";
import bcrypt from "bcrypt";
import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
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
  ): Promise<InsertOneResult<UserInterface> | null> {

    const userExists = await this.userRepository.verifyUser(usuario);
    const codigo = (Math.random() * 90000 + 10000) | 0;

    if (userExists) {

      return null;
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

    const createdUser = await this.userRepository.createUser(userData);
    await this.emailService.esqueciSenha(email, String(codigo), usuario);
    return createdUser;
  }

  public async updateUser(user: UserInterface, id: string): Promise<UpdateResult<Document> | null> {

    const typedUser: UserInterface = {
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senha: user.senha,
      status: user.status,
      calculos: user.calculos,
    };

    const updatedUser = await this.userRepository.updateUser(
      new ObjectId(String(id)),
      typedUser
    );

    return updatedUser;
  }

  public async deleteUser(id: string): Promise<DeleteResult | null> {
    const deletedUser = await this.userRepository.deleteUser(new ObjectId(String(id)),);

    return deletedUser;
  }

  public async login(usuario: string, senha: string): Promise<string | null> {
    const pip = [
      {
        $match: { usuario: usuario }
      }
    ];

    const user = await this.searchUser(pip);

    if (!user) {
      return null;
    }

    const correctPass = await bcrypt.compare(senha, user.senha);

    if (!correctPass) {
      return null;
    }

    return String(user._id);
  }

}

export default UserService;
