// @ts-ignore
import prisma from '/prisma/index.js'

export async function getTopRecipes(take = 35) {
    console.log('getTopRecipes controller');
    const recipes = await prisma.recipe.findMany({
        orderBy: {
            rating: 'desc',
        },
        take,
    });

    return recipes;
}
