import { z } from "zod";
import { UserMealPlanSchema } from "../schemas/Schemas.js";

export type UserMealPlan = z.infer<typeof UserMealPlanSchema>;



