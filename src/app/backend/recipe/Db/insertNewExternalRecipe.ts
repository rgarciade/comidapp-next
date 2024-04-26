// @ts-ignore
import prisma from '/prisma/index.js'
import {Recipe} from "@prisma/client";

export interface newExternalRecipe {
    title: string,
    description: string,
    image: string,
    externalId: string,
    externalUrl: string,
    categoryId: string
    language?: string
}

export async function insertNewExternalRecipe(data:newExternalRecipe):Promise<Recipe> {
    try {

       const newRecipe = prisma.recipe.create({
           data
       })
        return newRecipe
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong' )
    }
}
