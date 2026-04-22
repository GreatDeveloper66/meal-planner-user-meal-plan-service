import mongoose from 'mongoose';
import { UserMealPlan } from "../data_types/index.js";

const userMealPlanSchema = new mongoose.Schema<UserMealPlan>({
    userId: { type: String, required: true },
    mealPlan: { type: Object, required: true },
});

const UserMealPlanModel = mongoose.model<UserMealPlan>('UserMealPlan', userMealPlanSchema);

export default UserMealPlanModel;