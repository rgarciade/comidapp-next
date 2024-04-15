import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getRecipe(id) {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                recipeIngredients: {
                    include: {
                        IngredientType: true,
                    },
                },
                preparationSteps: true,
            },
        })

        if (!recipe) {
            return { error: 'Recipe not found' }
        }

        return recipe
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
