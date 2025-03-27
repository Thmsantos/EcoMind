import { connectToMongoDB } from './src/config/db.js';
import app from './src/api/routes/route.js'
const port = 2010;

async function execute() {
  await connectToMongoDB();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

execute();


