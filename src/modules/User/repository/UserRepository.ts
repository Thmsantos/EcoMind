import { ObjectId } from "mongodb";
import { client } from "../../../config/db.js";
import { UserInterface } from "../interfaces/userInterface.js";

class UserRepository {
  public async searchUser(userId: ObjectId): Promise<UserInterface> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection<UserInterface>("users");

      const user = await collection.findOne({ _id: userId });
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  public async createUser(user: UserInterface): Promise<void> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection<UserInterface>("users");

      await collection.insertOne(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  public async updateUser(id: ObjectId, user: UserInterface): Promise<void> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection("users");

      await collection.updateOne({ _id: id }, { $set: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  public async deleteUser(userId: ObjectId): Promise<void> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection("users");

      await collection.deleteOne({ _id: userId });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  public async login(id: ObjectId, senha: string, usuario: string): Promise<boolean> {
    try {
      const userAuth = await this.searchUser(id)

      if(userAuth.senha === senha && userAuth.usuario === usuario){
        return true;
      }

      return false;

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }
}

export default UserRepository;
