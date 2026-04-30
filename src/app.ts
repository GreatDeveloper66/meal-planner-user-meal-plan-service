import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { 
  createUserMealPlan, 
  getUserMealPlan,
  deleteUserMealPlan,
  updateUserMealPlan
} from './controllers/Controllers.js';
import { UserMealPlanSchema } from './schemas/Schemas.js';
import { authenticationMiddleware, validate } from './middleware/Middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// Public routes (no authentication needed)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Protected routes (require authentication)
app.use('/api', authenticationMiddleware);

app.post('/api/create-user-meal-plan', validate(UserMealPlanSchema), createUserMealPlan);
app.get('/api/get-user-meal-plan', getUserMealPlan);
app.delete('/api/delete-user-meal-plan', deleteUserMealPlan);
app.patch('/api/update-user-meal-plan', validate(UserMealPlanSchema), updateUserMealPlan);


export default app;