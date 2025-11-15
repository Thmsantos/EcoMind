import { InsertOneResult, UpdateResult } from "mongodb";
import { client } from "../../../config/database/db.ts";
import type { RankingInterface } from "../interfaces/RankingInterface.ts";

class RankingRepository {
    public async create(ranking: RankingInterface): Promise<InsertOneResult<RankingInterface> | null> {
        try {
            const db = client.db("EcoMind");
            const collection = db.collection<RankingInterface>("ranking");
            const result = await collection.insertOne(ranking);

            return result || null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw error;
            }

            throw new Error(String(error))
        }
    }

    public async update(user: string, pontos: number): Promise<UpdateResult<RankingInterface> | null> {
        const db = client.db("EcoMind");
        const collection = db.collection<RankingInterface>("ranking");

        const resultado = await collection.updateOne(
            { user },
            { $set: { pontos } }
        );

        return resultado || null;
    }

    public async search(pip: any): Promise<RankingInterface | null> {
        const db = client.db("EcoMind");
        const collection = db.collection<RankingInterface>("ranking");

        const data = await collection.aggregate<RankingInterface>(pip).next();
        return data;
    }
}

export default RankingRepository;
