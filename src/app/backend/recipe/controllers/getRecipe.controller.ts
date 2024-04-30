// @ts-ignore
import prisma from '/prisma/index.js'
import { Prisma } from '@prisma/client'
import {getRecipeByExternalId} from "@/app/backend/recipe/services/forkify/getRecipeByExternaId.service";
import {translate} from "@/app/backend/services/translate";
import {insertNewExternalRecipe, ExternalRecipeData} from "@/app/backend/recipe/Db/insertExternalRecipeData";
import {ExternalRecipe, Recipe} from "@prisma/client";
import {ApiResponseIndividualRecipe, Ingredient} from "@/app/backend/recipe/interfaces/forkity";
import {getNewExternalRecipe} from "@/app/backend/recipe/Db/gerExternalRecipeData";
import {updateExternalRecipeById} from "@/app/backend/recipe/Db/updateRecipe";


async function  translateRecipeTitle(recipe:Recipe){
   const title = await translate({text: recipe.title})
    return title
}

function translateRecipeIngredients(externalRecipe:ApiResponseIndividualRecipe):Promise<object[]> {
    return new Promise((resolve) => {
        try {
            const ingredients:Ingredient[] = externalRecipe.data?.recipe?.ingredients

            const ingredientsToTranslate = []
            for (let i = 0; i < ingredients.length; i++) {
                const ingredient = ingredients[i]
                ingredientsToTranslate.push(ingredient.description)
            }
            const stringIngredientsToTranslate = ingredientsToTranslate.join(' | ');
            translate({text: stringIngredientsToTranslate})
                .then(ingredientsTranslated => {
                    const newIngredients:object[] = ingredientsTranslated.split(' | ')
                    .map((ingredient: string, index:number) => {
                        return {
                            units: ingredients[index]?.quantity,
                            IngredientType: {
                                name: ingredient
                            }
                        }
                    })
                    resolve(newIngredients)
                })
                .catch(e => {
                    console.error(e)
                    resolve([])
                })
        }catch (e){
            console.error(e)
            resolve([])
        }
    })
}

interface ExternalRecipeWithIngredients extends ExternalRecipe {
    recipeIngredients: object[],
    preparationTime: string,
    rations: string,
    externalUrl: string,
    title: string,
    description: string,
    error?:string
}

export  async function getExternalRecipe(recipe:Recipe): Promise< ExternalRecipeWithIngredients | {error:string}> {

    if(!recipe.externalId){
        return {error: 'Recipe not found' }
    }

    let externalRecipeData:ExternalRecipe= await getNewExternalRecipe(recipe.id)
    if(!externalRecipeData){
        const externalRecipeJson: ApiResponseIndividualRecipe = await getRecipeByExternalId(recipe.externalId)
        let newRecipeTitle:string|undefined
        let newIngredients:object[]|undefined
        if(recipe.language === 'en') {
             newRecipeTitle = await translateRecipeTitle(recipe)
        }
        newIngredients = await translateRecipeIngredients(externalRecipeJson)

        const externalRecipe:Prisma.JsonObject = {
            title: newRecipeTitle?? recipe.title,
            ingredients: newIngredients?? [],
            preparationTime: externalRecipeJson?.data?.recipe?.cooking_time,
            rations: externalRecipeJson?.data?.recipe?.servings,
            sourceUrl: externalRecipeJson?.data?.recipe?.source_url,
        }
        updateExternalRecipeById(recipe.externalId, {title: newRecipeTitle, description: newRecipeTitle, language:'es'}).catch(e => console.error(e))
        externalRecipeData = await insertNewExternalRecipe(recipe.id, externalRecipe )
    }
    return {
        jsonData:externalRecipeData?.jsonData,
        recipeId: recipe.id,
        ...recipe,
        recipeIngredients: externalRecipeData?.jsonData?.ingredients,
        preparationTime: externalRecipeData?.jsonData?.preparationTime,
        rations: externalRecipeData?.jsonData?.rations,
        externalUrl: externalRecipeData?.jsonData?.sourceUrl,
        title: externalRecipeData?.jsonData?.title,
        description: externalRecipeData?.jsonData?.title
    }
}

export async function getRecipe(id: string) {
    try {
        console.log('entra en getRecipe')
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
            return await getExternalRecipe(recipe);
        }

        return recipe
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
