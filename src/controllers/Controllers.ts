import { Request, Response } from "express";
import { UserMealPlanModel } from "../models/Models";

export const createUserMealPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: missing userId",
      });
    }

    const mealPlanData = req.body;

    const created = await UserMealPlanModel.create({
      ...mealPlanData,
      userId, // 🔥 injected from token, not client
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error while creating meal plan",
    });
  }
};

export const getUserMealPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: missing userId",
      });
    }

    const mealPlan = await UserMealPlanModel.findOne({ userId });

    return res.status(200).json(mealPlan);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error while getting meal plan",
    });
  }
};

export const deleteUserMealPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: missing userId",
      });
    }

    const deleted = await UserMealPlanModel.deleteOne({ userId });

    return res.status(200).json(deleted);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error while deleting meal plan",
    });
  }
};

export const updateUserMealPlan = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized: missing userId",
      });
    }

    const mealPlanData = req.body;

    const updated = await UserMealPlanModel.updateOne(
      { userId },
      mealPlanData
    );

    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error while updating meal plan",
    });
  }
};