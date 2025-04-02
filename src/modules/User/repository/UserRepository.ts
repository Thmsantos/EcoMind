import { ObjectId } from "mongodb";
import { client } from "../../../config/db.js";
import { UserInterface } from "../interfaces/userInterface.js"

class UserRepository {
    public async searchUser(userId: ObjectId): Promise<UserInterface> {
        const db = client.db("EcoMind")
        const collection = db.collection<UserInterface>("users");

        const user = await collection.findOne({ _id: userId })
        return user;
    }

    public async createUser(user: UserInterface): Promise<void> {
        const db = client.db("EcoMind");
        const collection = db.collection<UserInterface>("users");

        const user_new = await collection.insertOne(user);

        if(user_new){
            console.log('oi')
        }
    }

    public async updateUser(user: UserInterface): Promise<void> {
        const db = client.db("EcoMind");
        const collection = db.collection("users");

        await collection.updateOne(
            { _id: user.id },
            { $set: user }
        )
    }

    public async deleteUser(userId: ObjectId): Promise<void> {
        const db = client.db("EcoMind");
        const collection = db.collection("users");

        await collection.deleteOne({ _id: userId })
    }
}


export default UserRepository
