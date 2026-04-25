import { z, date  } from "zod";
import { id } from "zod/locales";

export const UserMealPlanSchema = z.object({
    userId: id,
    date: date(),
    mealPlan: z.object({
        id: id,
        date: date(),
        meals: z.array(
            z.object({
                id: id,
                name: z.enum(["breakfast", "lunch", "dinner"]),
                image: z.string().optional(),
                foods: z.array(z.object({
                    id: id,
                    name: z.string(),
                    calories: z.number(),
                    protein: z.number(),
                    carbs: z.number(),
                    fat: z.number(),
                    quantity: z.string().optional(),
                })),
                price: z.number().optional(),
            })
        ),
}),
});

