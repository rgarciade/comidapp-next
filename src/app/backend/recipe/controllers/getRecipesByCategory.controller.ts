// @ts-ignore
import prisma from '/prisma/index.js'
import DbUseService from "@/app/backend/services/DbUseService";


export async function getRecipesByCategory(categoryId: string, maxResults: number = 20, page: number = 1) {
    try {
        const recipes = await DbUseService.getAll({
            table: 'recipe',
            where: { categoryId },
            includes: {
                recipeIngredients: {
                    include: {
                        IngredientType: true,
                    },
                },
                preparationSteps: true,
                category: true,
            },
            pageSize: maxResults,
            page,
        });
        if (!recipes) {
            return { error: `Recipes  by type ${categoryId} not found` }
        }
        return recipes
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}


