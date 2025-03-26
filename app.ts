import express from 'express';
import { MongoClient } from "mongodb";
const app = express();
const port = 2010;

function connectToMongoDB() {
    const mongoURI = 'mongodb://localhost:27017';
    let dbClient: MongoClient | null  = new MongoClient(mongoURI);
    dbClient = new MongoClient(mongoURI);
    dbClient.connect();
    console.log("Conectado ao banco");
}

async function execute() {
  await connectToMongoDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

execute();


