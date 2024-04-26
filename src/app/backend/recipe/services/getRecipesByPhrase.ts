// @ts-ignore
import prisma from '/prisma/index.js'
import {IngredientType, Recipe, RecipeIngredient} from "@prisma/client";


interface ExtendedIngredientType extends IngredientType {
    recipeIngredients:  RecipeIngredient[]
}

const getRecipesByTitle = async (words: string[]) => {
    const wordsQueries = words.map(word => ({
        title: {
            contains: word,
            mode: 'insensitive'
        }
    }));
    return prisma.recipe.findMany({
        where: {
            OR: wordsQueries,
        },
    });
}

const getRecipesByIngredients = async (foundInTitle:Recipe[], words: string[]) => {
    const ingredientTypeWordsQueries = words.map(word => ({
        name: {
            contains: word,
            mode: 'insensitive'
        }
    }));
    // Buscar todas las palabras en el campo name de la tabla ingredientType
    const foundInIngredientType: ExtendedIngredientType[] = await prisma.ingredientType.findMany({
        where: {
            OR: ingredientTypeWordsQueries,
        },
        include: {
            recipeIngredients: true
        },
    });

    // agrupa los ingredientes por id de receta
    const recipeIdFromIngredientTypeIds = foundInIngredientType.reduce((acc, ingredientType) => {
        ingredientType.recipeIngredients.forEach(recipeIngredient => {
            acc.push(recipeIngredient.recipeId)
        })
        return acc;
    }, [] as string[])

    //buscar si los ids de recipeIdFromIngredientTypeIds existen en foundInTitle, sino agregalos a un nuevo array
    const recipeIdsToFind = recipeIdFromIngredientTypeIds.reduce((acc: string[], idToFind:string) => {
        if(!foundInTitle.some((item:Recipe) => item.id === idToFind)){
            acc.push(idToFind)
        }
        return acc;
    }, [] as string[])
    const recipesFromIngredientType = await prisma.recipe.findMany({
        where: {
            id: {
                in: recipeIdsToFind
            }
        }
    })
    return recipesFromIngredientType
}



export async function getRecipesByPhrase(phrase: string):Promise<Recipe[]> {
    try {
        const words = phrase.split(' ').filter(word => word.length > 2);

        const foundInTitle = await getRecipesByTitle(words);
        const recipesFromIngredientType = await getRecipesByIngredients(foundInTitle, words);

        return [...foundInTitle, ...recipesFromIngredientType]
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong')
    }
}
