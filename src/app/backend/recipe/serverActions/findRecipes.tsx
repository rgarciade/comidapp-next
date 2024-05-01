'use server'

import {getFindAllRecipes} from "@/app/backend/recipe/controllers/getFindAllRecipes.controller";

export default async function findRecipes(search:string,maxResults:number = 40){
    const recipes = await getFindAllRecipes(search,maxResults)
    return recipes
}
