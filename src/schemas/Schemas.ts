import { z } from "zod";

export const UserMealPlanSchema = z.object({
    userId: z.string(),
    date: z.coerce.date(),
    mealPlan: z.object({
        id: z.string(),
        date: z.coerce.date(),
        meals: z.array(
            z.object({
                id: z.string(),
                name: z.enum(["breakfast", "lunch", "dinner"]),
                image: z.string().optional(),
                foods: z.array(z.object({
                    id: z.string(),
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

