import { client } from "../../../config/db.js";
import { UserInterface } from "../interfaces/userInterface.js"

class UserRepository {
    public async helloWorld(oi: string): Promise<string> {
        return oi;
    }

    public async createUser(user: UserInterface): Promise<void>{
        try {
            const db = client.db("EcoMind");
            const collection = db.collection("users");

            await collection.insertOne(user);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    }
}


export default UserRepository
