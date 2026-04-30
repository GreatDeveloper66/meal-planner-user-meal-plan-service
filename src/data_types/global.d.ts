// src/types/global.d.ts
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Extend Express Request type to include userId

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
