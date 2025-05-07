import { client } from "../../../config/db.js";
import { IRanking } from "../interfaces/rankingInterface.js";
import { ObjectId } from "mongodb";


class RankingRepository {
    public async create(ranking: IRanking): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<IRanking>("ranking");
            await collection.insertOne(ranking);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error))
        }
    }

    public async update(id: ObjectId, pontos: number): Promise<boolean> {
        const db = client.db("EcoMind");
        const collection = db.collection<IRanking>("ranking");

        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { pontos } }
        );

        return resultado.modifiedCount > 0;
    }

    public async search(): Promise<IRanking[]> {
        const db = client.db("EcoMind");
        const collection = db.collection<IRanking>("ranking");

        return await collection.find({}).toArray();
    }

    public async searchByUser(usuario: string): Promise<IRanking | null> {
        const db = client.db("EcoMind");
        const collection = db.collection<IRanking>("ranking");

        const data = await collection.findOne({ usuario });
        return data;
    }

}

export default RankingRepository;
