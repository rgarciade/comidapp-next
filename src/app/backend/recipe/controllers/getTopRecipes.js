import prisma from '/prisma/index.js'

export async function getTopRecipes(take = 50) {
    const recipes = await prisma.recipe.findMany({
        orderBy: {
            rating: 'desc',
        },
        take,
    });

    return recipes;
}
