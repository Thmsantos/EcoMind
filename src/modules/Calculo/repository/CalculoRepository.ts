import { client } from "../../../config/db.js";
import { CalculoInterface } from "../interfaces/calculoInterface.js";

class CalculoRepository {
  public async createCalculo(calculos: CalculoInterface): Promise<void> {
    try {
      const db = client.db("EcoMind");
      const collection = db.collection<CalculoInterface>("calculo");

      const result = await collection.insertOne(calculos);
      console.log("Calculo inserido com sucesso:", result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(String(error));
    }
  }
}

export default CalculoRepository;