'use server'
import { getRecipe } from "@/app/backend/recipe/controllers/getRecipe.controller";

export  async function getRecipeAction(id:string){
    const recipes = await getRecipe(id)
    return recipes
}


