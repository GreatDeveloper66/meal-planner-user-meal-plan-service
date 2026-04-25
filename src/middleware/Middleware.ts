import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const app = express();



const secret = process.env.JWT_SECRET!;
const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};


const getIdFromToken = (token: string) => {
  const decodedToken = verifyJwtToken(token);
  if(!decodedToken) {
    return {message: "Unauthorized no token found"};
  }
  const id = (decodedToken as any).id;
  if(!id) {
    return {message: "Unauthorized no id found"};
  }
  return {message: "Authorized", id: (decodedToken as any).id};
}

export const authenticationMiddleware = (req: Request, res: Response, next: any) => {
  const {message, id} = getIdFromToken(req.headers.authorization!);
  if(message === "Unauthorized no token found" || message === "Unauthorized no id found") {
    res.status(401).send(message);
    return;
  }
  req.body.userId = id;
  next();
}