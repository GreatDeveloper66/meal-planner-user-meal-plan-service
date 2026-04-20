import { Request, Response } from 'express';

export type FoodItem = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: string;
};

export type Meal = {
  id: string;
  name: "breakfast" | "lunch" | "dinner";
  foods: FoodItem[];
};

export type MealWithPrice = Meal & {
  price: number;
};

export type MealPlan = {
  id: string;
  date: string; // ISO date string
  meals: Meal[];
};

export type MealPlanWithPrice = {
  id: string;
  date: string; // ISO date string
  meals: MealWithPrice[];
};

export type UserMealPlan = {
    userId: string;
    mealPlan: MealPlan;
}

export type UserMealPlanWithPrice = {
    userId: string;
    mealPlan: MealPlanWithPrice;
}

type MealImage = {
  mealImageUrl: string;
};

export type MealPlanImages = {
  MealPlanImagesUrls: MealImage[];
}

export type TestGPTRequestBody = {
  prompt?: string;
};

export type TestGPTResponseBody = {
  text: string;
} | {
  error: string;
};

export type TestDalleRequestBody = {
  prompt?: string;
};

export type TestDalleResponseBody = {
  imageUrl: string;
} | {
  error: string;
};

export type TestGPTRequest = Request<{}, {}, TestGPTRequestBody>;
export type TestGPTResponse = Response<TestGPTResponseBody>;
export type TestDalleRequest = Request<{}, {}, TestDalleRequestBody>;
export type TestDalleResponse = Response<TestDalleResponseBody>;

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type MealPlanResponseBody = {
  mealPlan: MealPlan;
};

export type MealPlanResponse = Response<MealPlanResponseBody>;

export type MealPlanRequest = Request<{}, {}, MealPlan>;
export type MealPlanRequestWithPrice = Request<{}, {}, MealPlanWithPrice>;

export type MealPlanWithPriceResponseBody = {
  mealPlan: MealPlanWithPrice;
};

export type MealPlanWithPriceResponse = Response<MealPlanWithPriceResponseBody>;


export type MealPlanImagesResponseBody = {
  mealPlanImages: MealPlanImages;
};

export type MealPlanImagesResponse = Response<MealPlanImagesResponseBody>;



