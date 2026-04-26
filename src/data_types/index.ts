import { z } from "zod";
import { UserMealPlanSchema } from "../schemas/Schemas";

export type UserMealPlan = z.infer<typeof UserMealPlanSchema>;



