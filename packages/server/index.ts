import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send(process.env.OPENAI_API_KEY);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
