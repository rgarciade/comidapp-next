// @ts-ignore
import prisma from '/prisma/index.js'
import {ExternalRecipe,Prisma} from "@prisma/client";

export interface ExternalRecipeData {
    title: string,
    ingredients: object[],
    preparationTime: string,
    rations: string[],
    sourceUrl: string,
}


export async function insertNewExternalRecipe(recipeId:string, JsonData:Prisma.JsonObject):Promise<ExternalRecipe> {
    try {
        const recipeExternalData = await prisma.externalRecipe.create({
            data: {
                recipeId,
                jsonData:JsonData
            }
        }).catch(async ()=>
            await prisma.externalRecipe.findUnique({
                where: {recipeId}
            })
        )
        return recipeExternalData
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong' )
    }
}
