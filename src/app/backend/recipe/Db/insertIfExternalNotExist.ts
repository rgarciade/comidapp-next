// @ts-ignore
import prisma from '/prisma/index.js'
import {insertNewExternalRecipe, newExternalRecipe} from "@/app/backend/recipe/Db/insertNewExternalRecipe";
import {translate} from "@/app/backend/services/translate";

export async function insertIfExternalNotExist(newExternalRecipe: newExternalRecipe) {
    try {
        const recipeExist =  await prisma.recipe.findUnique({
            where: {
                externalId: newExternalRecipe.externalId
            }
        })
        if (!recipeExist) {
            let title = newExternalRecipe.title.replace(/&amp;/g, '');
            let language = 'en'
            try {
                title = title? await translate({text: title}):title
                language = 'es'
            }catch (e) {
                console.log(e)
            }

            return await insertNewExternalRecipe({
                ...newExternalRecipe,
                description: title,
                title,
                language
            })
        }
        return recipeExist
    }catch (e) {
        console.log(e)
        throw new Error('Error inserting new external recipe')
    }
}
