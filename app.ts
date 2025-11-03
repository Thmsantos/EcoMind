import app from './src/api/routes/index.ts'
import { connectToMongoDB } from './src/config/database/db.ts';
import 'dotenv/config'

async function execute() {
  connectToMongoDB();

  app.listen(2010, () => {
    console.log(`Server running at http://localhost:${2010}`);
  });
}

execute();


