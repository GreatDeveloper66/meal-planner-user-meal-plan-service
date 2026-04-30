import { z } from "zod";

export const FoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  quantity: z.string().optional(),
});

export const MealSchema = z.object({
  id: z.string(),
  name: z.enum(["breakfast", "lunch", "dinner"]),
  image: z.string().optional(),
  price: z.number().optional(),
  foods: z.array(FoodSchema),
});

export const MealPlanSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  meals: z.array(MealSchema),
});

export const CreateMealPlanSchema = z.object({
  date: z.coerce.date(),
  mealPlan: MealPlanSchema,
});

export const UserMealPlanSchema = CreateMealPlanSchema.extend({
  userId: z.string(),
});