import { MongoClient } from "mongodb";

const mongoURI = "mongodb://127.0.0.1:27021";
const client = new MongoClient(mongoURI);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Conectado ao banco");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
    }
}

export { client };
