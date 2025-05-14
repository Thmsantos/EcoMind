import { client } from "../../../config/database/db.js"
import EmailInterface from "../interfaces/emailInterface.js";

class EmailRepository {
    public async create(email: EmailInterface): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<EmailInterface>("emails");
            await collection.insertOne(email);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error))
        }
    }
}


export default EmailRepository