import { MongoClient } from "mongodb";

const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI);

export function connectToMongoDB() {
    try {
        client.connect();
        console.log("Conectado ao banco");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
    }
}

export { client };