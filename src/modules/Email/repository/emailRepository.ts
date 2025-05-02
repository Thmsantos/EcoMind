import { client } from "../../../config/db.js"
import emailInterface from "../interfaces/emailInterface.js";

class EmailRepository {
    public async create(email: emailInterface): Promise<void> {
        try{
            const db = client.db("EcoMind");
            const collection = db.collection<emailInterface>("emails");
            await collection.insertOne(email);
        }catch(error: unknown){
            if(error instanceof Error){
                throw error;
            }

            throw new Error(String(error))
        }
    }
}


export default EmailRepository