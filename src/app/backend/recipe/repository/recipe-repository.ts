// @ts-ignore
import prisma from '/prisma/index.js'
import {tryCatchDbError} from "@/app/backend/services/dbError";
import {Recipe} from "@prisma/client";


export interface newRecipe {
    title: string,
    description: string,
    image: string,
    externalId: string,
    externalUrl: string,
    categoryId: string
    language?: string
}

const insertNewRecipe = async (recipe: newRecipe): Promise<Recipe> =>
    tryCatchDbError(async (recipe: newRecipe) => prisma.recipe.create({
        data:recipe
    }))(recipe)

export {
    insertNewRecipe
}
