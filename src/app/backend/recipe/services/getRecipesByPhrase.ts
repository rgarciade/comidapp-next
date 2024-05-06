// @ts-ignore
import prisma from '/prisma/index.js'
import {IngredientType, Recipe, RecipeIngredient} from "@prisma/client";


interface ExtendedIngredientType extends IngredientType {
    recipeIngredients:  RecipeIngredient[]
}

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
interface FoundRecipes {
    firstLevelResults: Record<string, Recipe>,
    secondLevelResults: Record<string, Recipe>,
    thirdLevelResults: Record<string, Recipe>,
}

const getRecipesByTitle = async (title:string) => {
    if(title.length < 3) return Promise.resolve([])
    return prisma.recipe.findMany({
        where: {
            title: {
                contains: title,
                mode: 'insensitive'
            }
        },
    })
}
const getRecipesByTitles = async (words: string[]) => {
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

const getRecipesByIngredients = async (foundInTitle:Record<string, Recipe>, words: string[]) => {
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
        if(!foundInTitle[idToFind]){
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

export async function getRecipesByPhrase(phrase: string):Promise<FoundRecipes> {
    try {
        const words = phrase.split(' ').filter(word => word.length > 2)
        const foundRecipes:FoundRecipes = {
            firstLevelResults: {},
            secondLevelResults: {},
            thirdLevelResults: {}
        }

        await getRecipesByTitle(phrase)
            .then((recipes) => {
                if(recipes.length) {
                    // iterate recipes and add to foundRecipes.firstLevelResults
                    recipes.forEach((recipe:any) => {
                        foundRecipes.firstLevelResults[recipe.id] = recipe
                    })
                }
            })
            .catch((e) => {})

        for (let i = 0; i < words.length/2 +1; i++) {
            const group1 = words.slice(0, (-(1+i))).join(' ')
            const group2 = words.slice(1+i).join(' ')
            await getRecipesByTitle(group1)
                .then((recipes) => {
                    if(recipes.length) {
                        recipes.forEach((recipe:any) => {
                            foundRecipes.firstLevelResults[recipe.id] = recipe
                        })
                    }
                }).catch((e) => {})
            await getRecipesByTitle(group2)
                .then((recipes) => {
                    if(recipes.length) {
                        recipes.forEach((recipe:any) => {
                            foundRecipes.firstLevelResults[recipe.id] = recipe
                        })
                    }
                }).catch((e) => {})
        }
        const foundInTitleWords = await getRecipesByTitles(words);
        const recipesFromIngredientType = await getRecipesByIngredients(foundRecipes.firstLevelResults, words);
        foundInTitleWords.forEach((recipe:any) => {
            if(!foundRecipes.firstLevelResults[recipe.id]){
                foundRecipes.secondLevelResults[recipe.id] = recipe
            }
        })
        recipesFromIngredientType.forEach((recipe:any) => {
            if(!foundRecipes.secondLevelResults[recipe.id]){
                foundRecipes.thirdLevelResults[recipe.id] = recipe
            }

        })
        return foundRecipes
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong')
    }
}
