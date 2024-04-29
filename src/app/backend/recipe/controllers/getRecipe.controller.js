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
            if(recipe.language === 'en'){
                const title = await translate({text:recipe.title})
                recipe.title = title
                recipe.description = title
            }
             await translate({text:stringIngredientsToTranslate})
                .then(ingredientsTranslated => {
                    recipe.recipeIngredients = ingredientsTranslated.split(' | ').map((ingredient, index) => {
                        return {
                            units: ingredients[index]?.quantity,
                            IngredientType: {
                                name: ingredient
                            }
                        }
                    })
                })
            .catch(e => {
                recipe.recipeIngredients = ingredients.map((ingredient, index) => {
                    return {
                        units: ingredients[index]?.quantity,
                        IngredientType: {
                            name: ingredient.description
                        }
                    }
                })
                console.error(e)
            })
            //{ingredient.units} {ingredient.IngredientType.name}
            recipe.preparationTime = externalRecipe.data.recipe.cooking_time
            recipe.rations = externalRecipe.data.recipe.servings
            recipe.sourceUrl = externalRecipe.data.recipe.source_url

        }

        return recipe
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
