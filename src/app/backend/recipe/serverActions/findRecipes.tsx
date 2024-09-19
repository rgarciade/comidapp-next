'use server'

import {getFindAllRecipes} from "@/app/backend/recipe/controllers/getFindAllRecipes.controller";
import {getRecipesByCategory} from "@/app/backend/recipe/controllers/getRecipesByCategory.controller";

export  async function findRecipes(search:string,maxResults:number = 20){
    const recipes = await getFindAllRecipes(search,maxResults)
    return recipes
}
export async function findRecipesByCategory(categoryId:string){
    const recipes = await getRecipesByCategory(categoryId)
    return recipes
}
