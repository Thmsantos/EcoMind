import UserRepository from "../repository/UserRepository.ts";
import type { UserInterface } from "../interfaces/userInterface.ts";
import User from "../User.ts";
import bcrypt from "bcrypt";
import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";

class UserService {
  private userRepository: UserRepository;

  constructor(
    userRepository: UserRepository
  ) {
    this.userRepository = userRepository;
  }

  public async searchUser(pip: any): Promise<UserInterface | null> {
    const user = await this.userRepository.search(pip);

    return user || null;
  }

  public async searchUserById(id: string): Promise<UserInterface | null> {
    const user = await this.userRepository.searchById(new ObjectId(id));

    if (!user) return null;

    const { senha, ...userWithoutPass } = user;
    return userWithoutPass;
  }

  public async createUser(
    user: string,
    name: string,
    email: string,
    senha: string,
    status: boolean,
    avatar: string,
  ): Promise<InsertOneResult<UserInterface> | null> {

    const userExists = await this.userRepository.verifyUser(user);

    if (userExists) {

      return null;
    }

    const criptSenha = await bcrypt.hash(senha, 10);

    const instancedUser = new User(
      user,
      name,
      email,
      criptSenha,
      status,
      avatar
    );

    const userData: UserInterface = {
      user: instancedUser.getUser(),
      name: instancedUser.getName(),
      email: instancedUser.getEmail(),
      senha: instancedUser.getSenha(),
      status: instancedUser.getStatus(),
      avatar: instancedUser.getAvatar(),
    };

    const createdUser = await this.userRepository.createUser(userData);
    return createdUser;
  }

  public async updateUser(user: UserInterface, id: string): Promise<UpdateResult<Document> | null> {
    const typedUser: UserInterface = {
      user: user.user,
      name: user.name,
      email: user.email,
      senha: await bcrypt.hash(user.senha!, 10),
      status: user.status,
      avatar: user.avatar,
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

  public async login(user: string, senha: string): Promise<string | null> {
    const pip = [{ $match: { user: user } }];
    const searchedUser = await this.searchUser(pip);

    if (!searchedUser) return null

    const correctPass = await bcrypt.compare(senha, searchedUser.senha!);

    if (!correctPass) return null;

    return String(searchedUser._id);
  }
}

export default UserService;
