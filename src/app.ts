// src/app.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  await connectDB(); // 👈 connect on demand
  res.send('Hello, World!');
});

export { app };