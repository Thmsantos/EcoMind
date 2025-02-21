import express from 'express';

const app = express();
const port = 2010;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
