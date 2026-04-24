// src/app.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { createUserMealPlan, createUserMealPlanWithPrice } from './controllers/Controllers.js';

const app = express();

app.use(cors());
app.use(express.json());

await connectDB(); // 👈 connect on demand

app.post('/createUserMealPlan', createUserMealPlan);
app.post('/createUserMealPlanWithPrice', createUserMealPlanWithPrice);


app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

export default app;