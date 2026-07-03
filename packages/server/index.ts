import dotenv from 'dotenv';
import express from 'express';
import router from './routes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
