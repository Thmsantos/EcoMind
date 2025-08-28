import { client } from "../../../config/database/db.js";
import { EstatisticasData } from "../EstatisticasData";

class EstatisticasRepository{
    public async createEstatisticas(data: EstatisticasData): Promise<void>{
        try{
            const db = client.db("EcoMind")
            const collection = db.collection<EstatisticasData>("estatisticas");

            await collection.insertOne(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw error;
            }
      
            throw new Error(String(error));
          }
    }

    public async searchEstatisticas(pip: any): Promise<any>{
        try{
            const db = client.db("EcoMind")
            const collection = db.collection<EstatisticasData>("estatisticas");

            return await collection.aggregate<EstatisticasData>(pip).next();
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw error;
            }
      
            throw new Error(String(error));
          }
    }
}