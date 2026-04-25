import mongoose, {Schema} from 'mongoose';
import { UserMealPlan } from "../data_types/index.js";

const UserMealPlanSchema = new Schema<UserMealPlan>({
    userId: { type: String, required: true },
        date: { type: Date, required: true },
        mealPlan: {
            id: { type: String, required: true },
            date: { type: Date, required: true },
            meals: {
                id: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: false },
                foods: {
                    id: { type: String, required: true },
                    name: { type: String, required: true },
                    calories: { type: Number, required: true },
                    protein: { type: Number, required: true },
                    carbs: { type: Number, required: true },
                    fat: { type: Number, required: true },
                    quantity: { type: String, required: false },
                },
                image: { type: String, required: false },
            },
        },
});

export const UserMealPlanModel = mongoose.model<UserMealPlan>('UserMealPlan', UserMealPlanSchema);
