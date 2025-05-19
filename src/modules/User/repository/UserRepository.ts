import { ObjectId } from "mongodb";
import { client } from "../../../config/database/db.js";
import { UserInterface } from "../interfaces/userInterface.js";
import bcrypt from "bcrypt";

class UserRepository {
  public async search(usuario: string): Promise<UserInterface> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection<UserInterface>("users");

      const user = await collection.findOne({ usuario: usuario });
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

  public async login(senha: string, usuario: string): Promise<boolean> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection("users");
      const userAuth = await collection.findOne({ usuario: usuario })
      const senhaCorreta = await bcrypt.compare(senha, userAuth.senha);

      if (senhaCorreta && userAuth.usuario === usuario) {
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

  public async verifyUser(usuario: string): Promise<boolean> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection("users");
      const userExists = await collection.findOne({ usuario: usuario })

      return !!userExists;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }
}

export default UserRepository;
