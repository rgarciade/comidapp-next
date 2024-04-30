export  interface ForkityRecipe {
    publisher: string;
    image_url: string;
    title: string;
    id: string;
}
export interface specificForkityRecipe  {
    publisher: string;
    image_url: string;
    title: string;
    id: string;
    ingredients: Ingredient[];
    cooking_time: string;
    servings: string[];
    source_url: string;
}
export interface Ingredient {
    "quantity": number,
    "unit": string,
    "description": string
}

export interface RecipesData {
    recipes: ForkityRecipe[];
}
export interface RecipeData {
    recipe: specificForkityRecipe;
}


export interface ApiResponse {
    status: string;
    results: number;
    data: RecipesData ;
}

export interface ApiResponseIndividualRecipe  {
    status: string;
    results: number;
    data: RecipeData;
}
