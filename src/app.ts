// src/app.ts
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { createUserMealPlan, getUserMealPlan, updateUserMealPlan, deleteUserMealPlan} from './controllers/Controllers.js';
import { authenticationMiddleware } from './middleware/Middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticationMiddleware);

await connectDB(); // 👈 connect on demand

app.post('/createUserMealPlan', createUserMealPlan);
app.get('/getUserMealPlan', getUserMealPlan);
app.patch('/updateUserMealPlan', updateUserMealPlan);
app.delete('/deleteUserMealPlan', deleteUserMealPlan);


app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

export default app;