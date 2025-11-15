import { InsertOneResult } from "mongodb";
import { client } from "../../../config/database/db.ts";
import type { CalculoInterface } from "../interfaces/CalculoInterface.ts";

class CalculoRepository {
  public async createCalculo(calc: CalculoInterface): Promise<InsertOneResult<CalculoInterface> | null> {
    const db = client.db("EcoMind");
    const collection = db.collection<CalculoInterface>("calculo");

    const createdCalculo = await collection.insertOne(calc);
    return createdCalculo;
  }
}

export default CalculoRepository;