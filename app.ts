import express from 'express';
import { connectToMongoDB } from './src/config/db.js';
const app = express();
const port = 2010;


async function execute() {
  await connectToMongoDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

execute();


