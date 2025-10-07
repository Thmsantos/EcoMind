import { client } from "../../../config/database/db.ts";
import type { RankingInterface } from "../interfaces/RankingInterface.ts";
import { ObjectId } from "mongodb";


class RankingRepository {
    public async create(ranking: RankingInterface): Promise<void> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<RankingInterface>("ranking");
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
        const collection = db.collection<RankingInterface>("ranking");

        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { pontos } }
        );

        return resultado.modifiedCount > 0;
    }

    public async search(): Promise<RankingInterface[]> {
        const db = client.db("EcoMind");
        const collection = db.collection<RankingInterface>("ranking");

        return await collection.find({}).toArray();
    }

    public async searchByUser(pip: any): Promise<RankingInterface | null> {
        const db = client.db("EcoMind");
        const collection = db.collection<RankingInterface>("ranking");

        const data = await collection.aggregate<RankingInterface>(pip).next();
        return data;
    }

}

export default RankingRepository;
