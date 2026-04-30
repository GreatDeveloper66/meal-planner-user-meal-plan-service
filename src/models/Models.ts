import mongoose, { Schema } from "mongoose";
import { UserMealPlan } from "../data_types/index.js";

// --- Food ---
const FoodSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fat: { type: Number, required: true },
    quantity: { type: String },
  },
  { _id: false } // prevents extra Mongo _id for subdocs
);

const MealSchema = new Schema(
  {
    id: { type: String, required: true },
    name: {
      type: String,
      enum: ["breakfast", "lunch", "dinner"], // ✅ matches Zod enum
      required: true,
    },
    image: { type: String },
    price: { type: Number },
    foods: {
      type: [FoodSchema], // ✅ ARRAY (this fixes your bug)
      required: true,
    },
  },
  { _id: false }
);

const MealPlanSchema = new Schema(
  {
    id: { type: String, required: true },
    date: { type: Date, required: true },
    meals: {
      type: [MealSchema], // ✅ ARRAY
      required: true,
    },
  },
  { _id: false }
);

const UserMealPlanSchema = new Schema<UserMealPlan>({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  mealPlan: {
    type: MealPlanSchema,
    required: true,
  },
});

export const UserMealPlanModel = mongoose.model<UserMealPlan>(
  "UserMealPlan",
  UserMealPlanSchema
);