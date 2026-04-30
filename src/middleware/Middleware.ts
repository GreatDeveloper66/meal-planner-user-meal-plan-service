import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ZodType } from "zod";

dotenv.config();

const secret = process.env.JWT_SECRET!;

const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

const getIdFromToken = (token: string): { authorized: boolean; id?: string; message?: string } => {
  const decodedToken = verifyJwtToken(token);
  if (!decodedToken) {
    return { authorized: false, message: "Unauthorized: token could not be verified" };
  }
  const id = (decodedToken as any).id;
  if (!id) {
    return { authorized: false, message: "Unauthorized: no id found in token" };
  }
  return { authorized: true, id };
};

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized: no authorization header found" });
    return;
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Unauthorized: no token found" });
    return;
  }
  
  const { authorized, id, message } = getIdFromToken(token);
  
  if (!authorized) {
    res.status(401).json({ error: message });
    return;
  }
  
  req.userId = id;
  next();
};

// Optional: Middleware that doesn't require authentication (for public routes)
export const optionalAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      const { authorized, id } = getIdFromToken(token);
      if (authorized && id) {
        req.userId = id;
      }
    }
  }
  
  next();
};

export const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        message: "Validation failed",
        errors: formattedErrors,
      });
    }

    req.body = result.data;
    next();
  };