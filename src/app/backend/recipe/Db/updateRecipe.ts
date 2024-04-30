// @ts-ignore
import prisma from '/prisma/index.js'
import {Recipe} from "@prisma/client";

export interface updateExternalRecipe {
    title?: string,
    description?: string,
    image?: string,
    externalId?: string,
    externalUrl?: string,
    categoryId?: string
    language?: string
}

export async function updateExternalRecipeById(externalId:string,data:updateExternalRecipe):Promise<Recipe> {
    try {

       const newRecipe = prisma.recipe.update({
              where: {
                externalId: externalId
              },
           data
       })
        return newRecipe
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong' )
    }
}
