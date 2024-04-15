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
            description: 'Una ensalada fresca y deliciosa.',
            directions: 'Corta los tomates en rodajas y sírvelos en un plato.',
            preparationSteps: {
                create: [
                    { step: 'Corta los tomates.' },
                    { step: 'Sírvelos en un plato.' },
                ],
            },
        },
    })

    const espaguetisALaCarbonara = await prisma.recipe.create({
        data: {
            title: 'Espaguetis a la Carbonara',
            description: 'Un plato italiano clásico y sabroso.',
            directions: 'Cocina los espaguetis y mézclalos con el queso.',
            preparationSteps: {
                create: [
                    { step: 'Cocina los espaguetis.' },
                    { step: 'Mézclalos con el queso.' },
                ],
            },
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
