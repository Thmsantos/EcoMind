import app from './src/api/routes/route.js'
import { connectToMongoDB } from './src/config/database/db.js';
import 'dotenv/config'

const port = process.env.PORT;

async function execute() {
  connectToMongoDB();

  app.listen(2010, () => {
    console.log(`Server running at http://localhost:${2010}`);
  });
}

execute();


