const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Crear los tipos de ingredientes
    const tomate = await prisma.ingredientType.create({
        data: { name: 'Tomate' },
    })

    const espagueti = await prisma.ingredientType.create({
        data: { name: 'Espagueti' },
    })

    // Crear las recetas
    const ensaladaDeTomate = await prisma.recipe.create({
        data: {
            title: 'Ensalada de Tomate',
            preparationTime: 10,
            rating: 5,
            rations: 2,
            description: 'Una ensalada fresca y deliciosa.',
            preparationSteps: {
                create: [
                    { step: 'Corta los tomates.' },
                    { step: 'Sírvelos en un plato.' },
                ],
            },
            category: { connect: { id: '6d53a577-308e-49cd-b60d-e744e12401bd' } }, // Asociar la categoría
            difficulty: 'Fácil',
        },
    })

    const espaguetisALaCarbonara = await prisma.recipe.create({
        data: {
            title: 'Espaguetis a la Carbonara',
            description: 'Un plato italiano clásico y sabroso.',
            preparationTime: 11,
            rating: 3,
            rations: 1,
            preparationSteps: {
                create: [
                    { step: 'Cocina los espaguetis.' },
                    { step: 'Mézclalos con el queso.' },
                ],
            },
            category: { connect: { id: '4d9a49d3-d8a7-46e6-b213-5f24f6854d69'} }, // Asociar la categoría
            difficulty: 'Medio',
        },
    })

    // Asociar los ingredientes a las recetas
    await prisma.recipeIngredient.create({
        data: {
            units: '2',
            Recipe: { connect: { id: ensaladaDeTomate.id } },
            IngredientType: { connect: { id: tomate.id } },
        },
    })

    await prisma.recipeIngredient.create({
        data: {
            units: '200g',
            Recipe: { connect: { id: espaguetisALaCarbonara.id } },
            IngredientType: { connect: { id: espagueti.id } },
        },
    })
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
