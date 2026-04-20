import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${userName}:${password}@cluster0.bd45ngl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Function to create and return a MongoDB connection
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if(error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error(`An unknown error occurred while connecting to MongoDB. ${String(error)}`);
        }
        process.exit(1);
    }
}