import express from 'express';
import { connectDB } from './config/db';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

connectDB();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});