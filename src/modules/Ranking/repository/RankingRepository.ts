import { client } from "../../../config/db.js";
import { IRanking } from "../interfaces/rankingInterface.js";
import { ObjectId } from "mongodb";


class RankingRepository {
    public async criar(ranking: IRanking): Promise<void> {
        console.log("Thiii")
        try{
            const db = client.db("EcoMind");
            const collection = db.collection<IRanking>("ranking");
            await collection.insertOne(ranking);
        }catch(error:unknown){
            if(error instanceof Error){
                throw error;
            }

            throw new Error(String(error))
        }
    }

    public async atualizar(id: ObjectId, pontos: number): Promise<boolean> { 
        const db = client.db("EcoMind");
        const collection = db.collection<IRanking>("ranking");

        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },   // <-- Converte a string para ObjectId
            { $set: { pontos } }
        );

        // Se modificou um documento, retorna true; senão, false
        return resultado.modifiedCount > 0;
    }
}

export default RankingRepository;
