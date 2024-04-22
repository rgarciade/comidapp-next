import prisma from '/prisma/index.js'

export async function getTopRecipes(take = 5) {
    const recipes = await prisma.recipe.findMany({
        orderBy: {
            rating: 'desc',
        },
        take,
    });

    return recipes;
}
