import prisma from '/prisma/index.js'

export async function getAllRecipes() {
    try {
        const recipe = await prisma.recipe.findMany({
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
