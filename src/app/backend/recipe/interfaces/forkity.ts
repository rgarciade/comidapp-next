export  interface ForkityRecipe {
    publisher: string;
    image_url: string;
    title: string;
    id: string;
}

export interface RecipeData {
    recipes: ForkityRecipe[];
}

export interface ApiResponse {
    status: string;
    results: number;
    data: RecipeData;
}
