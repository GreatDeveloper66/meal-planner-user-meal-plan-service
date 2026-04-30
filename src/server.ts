// src/server.ts
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 3000;

// Start server function
const startServer = async () => {
  try {
    // Connect to database before starting the server
    await connectDB();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`🔒 Protected routes available at /api/*`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();