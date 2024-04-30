// @ts-ignore
import prisma from '/prisma/index.js'
import {ExternalRecipe} from "@prisma/client";


export async function getNewExternalRecipe(recipeId:string):Promise<ExternalRecipe> {
    try {

        const recipeExternalData = await prisma.externalRecipe.findUnique({
            where: {
                recipeId
            }
        })
        return recipeExternalData
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong' )
    }
}
