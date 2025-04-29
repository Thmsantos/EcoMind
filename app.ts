import app from './src/api/routes/route.js'
import { connectToMongoDB } from './src/config/db.js';
import 'dotenv/config'

const port = process.env.PORT;

async function execute() {
  await connectToMongoDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

execute();


