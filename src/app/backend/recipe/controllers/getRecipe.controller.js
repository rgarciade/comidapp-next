import prisma from '/prisma/index.js'
import {getRecipeByExternalId, getRecipeById} from "@/app/backend/recipe/services/forkify/getRecipeByExternaId.service";
import {translate} from "@/app/backend/services/translate";

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
                category: true,
            },
        })

        if (!recipe) {
            return { error: 'Recipe not found' }
        }
        if(recipe.externalId){
            const externalRecipe = await getRecipeByExternalId(recipe.externalId)
            const ingredients =  externalRecipe.data?.recipe?.ingredients
            const ingredientsToTranslate = []
            for(let i = 0; i < ingredients.length; i++) {
                const ingredient = ingredients[i]
                ingredientsToTranslate.push(ingredient.description)
            }
            const stringIngredientsToTranslate = ingredientsToTranslate.join(' | ');
            const ingredientsTranslated = await translate({text:stringIngredientsToTranslate})
                .catch(e => {
                recipe.recipeIngredients = ingredientsToTranslate
            })
            //{ingredient.units} {ingredient.IngredientType.name}
            recipe.preparationTime = externalRecipe.data.recipe.cooking_time
            recipe.rations = externalRecipe.data.recipe.servings
            recipe.sourceUrl = externalRecipe.data.recipe.source_url
            recipe.recipeIngredients = ingredientsTranslated.split(' | ').map((ingredient, index) => {
                return {
                    units: ingredients[index]?.quantity,
                    IngredientType: {
                        name: ingredient
                    }
                }
            })
        }

        return recipe
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
