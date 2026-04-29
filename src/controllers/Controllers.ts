import { Request, Response } from "express";
import { UserMealPlanModel } from "../models/Models";
import { UserMealPlanSchema } from "../schemas/Schemas";


export const createUserMealPlan = async (req: Request, res: Response) => {
  const result = UserMealPlanSchema.safeParse(req.body);
  if(result.success) {
    const validatedUserMealPlan = result.data;
    const userMealPlan = await UserMealPlanModel.create(validatedUserMealPlan);
    res.status(201).send(userMealPlan);
  } else if(result.error) {
    res.status(400).send(result.error);
  } else {
    res.status(500).send("Server down");
  }
}

export const getUserMealPlan = async (req: Request, res: Response) => {
  const userMealPlan = await UserMealPlanModel.findOne({userId: req.body.userId});
  if(userMealPlan) {
    res.status(200).send(userMealPlan);
  } else {
    res.status(404).send("User meal plan not found");
  }
}

export const updateUserMealPlan = async (req: Request, res: Response) => {
  const result = UserMealPlanSchema.safeParse(req.body);
  if(result.success) {
    const validatedUserMealPlan = result.data;
    const userMealPlan = await UserMealPlanModel.findOneAndUpdate({userId: req.body.userId}, validatedUserMealPlan, {new: true});
    if(userMealPlan) {
      res.status(200).send(userMealPlan);
    } else {
      res.status(404).send("User meal plan not found");
    }
  } else if(result.error) {
    res.status(400).send(result.error);
  } else {
    res.status(500).send("Server down");
  }
}


export const deleteUserMealPlan = async (req: Request, res: Response) => {
  const userMealPlan = await UserMealPlanModel.findOneAndDelete({userId: req.body.userId});
  if(userMealPlan) {
    res.status(200).send("User meal plan deleted");
  } else {
    res.status(404).send("User meal plan not found");
  }
}