import { client } from "../../../config/database/db.ts";
import type { CalculoInterface } from "../interfaces/CalculoInterface.ts";

class CalculoRepository {
  public async createCalculo(calculos: CalculoInterface): Promise<void> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection<CalculoInterface>("calculo");

      await collection.insertOne(calculos);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }

  public async searchCalculo(pip: any){
    const db = client.db("Ecomind");
    const collection = db.collection<CalculoInterface>("calculo");
  
    const calculo = await collection.aggregate<CalculoInterface>(pip).next();
    return calculo ?? null;
  }
}

export default CalculoRepository;