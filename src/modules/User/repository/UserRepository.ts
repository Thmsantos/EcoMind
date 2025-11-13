import {
  DeleteResult,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId
} from "mongodb";
import { client } from "../../../config/database/db.ts";
import type { UserInterface } from "../interfaces/userInterface.ts";

class UserRepository {
  public async search(pip: any): Promise<UserInterface | null> {
    const db = client.db("EcoMind");
    const collection = db.collection<UserInterface>("users");

    const user = await collection.aggregate<UserInterface>(pip).next();
    return user;
  }

  public async searchById(id: ObjectId): Promise<WithId<UserInterface> | null> {
    const db = client.db("EcoMind");
    const collection = db.collection<UserInterface>("users");

    const user = await collection.findOne({ _id: id });
    return user;
  }

  public async createUser(user: UserInterface): Promise<InsertOneResult<UserInterface>> {
    const db = client.db("EcoMind");
    const collection = db.collection<UserInterface>("users");

    const createdUser = await collection.insertOne(user);
    return createdUser;
  }

  public async updateUser(id: ObjectId, user: UserInterface): Promise<UpdateResult<Document> | null> {
    const db = client.db("EcoMind");
    const collection = db.collection("users");

    const updatedUser = await collection.updateOne({ _id: id }, { $set: user });

    return updatedUser || null
  }

  public async deleteUser(userId: ObjectId): Promise<DeleteResult | null> {
    const db = client.db("EcoMind");
    const collection = db.collection("users");

    const deletedUser = await collection.deleteOne({ _id: userId });
    return deletedUser;
  }

  public async verifyUser(usuario: string): Promise<boolean> {
    const db = client.db("EcoMind");
    const collection = db.collection("users");
    const userExists = await collection.findOne({ usuario: usuario })

    return !!userExists;
  }
}

export default UserRepository;
