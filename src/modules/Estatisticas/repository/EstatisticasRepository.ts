import { AggregationCursor, InsertOneResult, ObjectId } from "mongodb";
import { client } from "../../../config/database/db.ts";
import { EstatisticasData } from "../EstatisticasData";

class EstatisticasRepository {
  public async createEstatisticas(data: EstatisticasData): Promise<InsertOneResult<EstatisticasData> | null> {
    const db = client.db("EcoMind")
    const collection = db.collection<EstatisticasData>("estatisticas");

    const insertedData = await collection.insertOne(data);

    return insertedData;
  }

  public async searchEstatisticas(id: string): Promise<EstatisticasData[] | null> {
    const db = client.db("EcoMind");
    const collection = db.collection<EstatisticasData>("estatisticas");

    const pip = [
      {
        $match: { idUser: id }
      }
    ]

    const findedData = await collection.aggregate<EstatisticasData>(pip).toArray();
    return findedData;
  }
}

export default EstatisticasRepository;