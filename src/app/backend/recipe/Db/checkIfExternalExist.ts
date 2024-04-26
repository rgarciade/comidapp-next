// @ts-ignore
import prisma from '/prisma/index.js'

export async function checkIfExternalIdExist(externalRecipeId: string) {
    const recipeExist = await prisma.recipe.findUnique({
        where: {
            externalId: externalRecipeId
        }
    })
    return !!recipeExist
}
