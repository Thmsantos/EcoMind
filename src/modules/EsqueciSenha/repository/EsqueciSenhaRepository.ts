import { ObjectId } from "mongodb";
import { client } from "../../../config/database/db.ts"
import type { EsqueciSenhaInterface } from "../interfaces/esqueciSenhaInterface.ts"

class EsqueciSenhaRepository {
    public async create(esqueciSenha: EsqueciSenhaInterface): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<EsqueciSenhaInterface>("EsqueciSenha");
            await collection.insertOne(esqueciSenha);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error))
        }
    }

    public async search(usuario: String): Promise<EsqueciSenhaInterface | null> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<EsqueciSenhaInterface>("EsqueciSenha");
            const esqueciSenha = await collection.findOne({ usuario: usuario });
            return esqueciSenha;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error));
        }
    }

    public async update(
        usuario: String,
        esqueciSenha: EsqueciSenhaInterface
    ): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<EsqueciSenhaInterface>("EsqueciSenha");

            await collection.updateOne({ usuario: usuario }, { $set: esqueciSenha })
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error));
        }
    }

    public async delete(userId: ObjectId): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<EsqueciSenhaInterface>("EsqueciSenha");
            await collection.deleteOne({ _id: userId })
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error));
        }
    }
}

export default EsqueciSenhaRepository;