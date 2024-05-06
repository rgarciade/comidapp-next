import {Recipe} from "@prisma/client";
import {getRecipesByPhrase} from "@/app/backend/recipe/services/getRecipesByPhrase";
import {getAllKeysFromWords} from "@/app/backend/recipe/Db/forkity/getAllKeysFromWords";
import {insertIfExternalNotExist} from "@/app/backend/recipe/Db/insertIfExternalNotExist";
import {getRecipeListByKey} from "@/app/backend/recipe/services/forkify/getRecipeListByKey.service";
const { FORKIFY_URL,FORKIFY_API_KEY } = process.env

async function resolveNewRecipesWaiting(newRecipesPromises:Promise<any>[]) {
    let newRecipes: Recipe[] = []
     await Promise.allSettled(newRecipesPromises).then((result) => {
        newRecipes=result.map((item: any) => item.value)
    })
    return newRecipes
}
 function resolveNewRecipesNotWaiting(newRecipesPromises:Promise<any>[],timeout:number = 4000) {
    return new Promise((resolve, reject) => {
        let newRecipes: Recipe[] = []
        setTimeout(() => {
            Promise.allSettled(newRecipesPromises).then((result) => {
                newRecipes=result.map((item: any) => item.value)
                resolve(newRecipes)
            }).catch((e) => {
                reject(e)
            })
        }, timeout)
    })
}


async function translateAndReturnExternalRecipeIfNotExist(recipesGroup: any[], numberOfRecipes: number = 10, asyncCall:boolean = false):Promise<Recipe[] > {
    return new Promise(async (resolve, reject) => {
        const allRecipesGrouped = recipesGroup.reduce((acc: any[], recipe: any) => {
            const recipes = recipe?.value?.data?.recipes?
                recipe.value.data.recipes
                : recipe?.id? [recipe] : []
            return [ ...acc,...recipes]
        }, [])
        const newRecipesPromises:Promise<any>[] = []

        for(let i = 0; i < numberOfRecipes; i++) {
            const recipesResponse = allRecipesGrouped[i]
            newRecipesPromises.push(insertIfExternalNotExist({
                title: recipesResponse.title,
                description: recipesResponse.title,
                image: recipesResponse.image_url,
                externalId: recipesResponse.id,
                externalUrl: `${FORKIFY_URL}/${recipesResponse.id}/?key=${FORKIFY_API_KEY}`,
                categoryId: '851c9dd6-1cb8-4e6d-8d7a-22c83f669aaa'
            }))
        }

        await resolveNewRecipesWaiting(newRecipesPromises).then((newRecipes: any) => {
            resolve(newRecipes)
        }).catch((e) => {
            reject(e)
        })

        const newRecipesGroup = allRecipesGrouped.splice(numberOfRecipes, allRecipesGrouped.length-1);
        if(newRecipesGroup.length > 0){
            const limit = newRecipesGroup.length > numberOfRecipes ? numberOfRecipes : newRecipesGroup.length
            translateAndReturnExternalRecipeIfNotExist(newRecipesGroup,limit,true).catch((e) =>
                reject(e)
            )
        }
    })
}


export async function getFindAllRecipes(phrase: string,maxResults:number):Promise<Recipe[]> {
    try {
        const recipes = await getRecipesByPhrase(phrase)
        let newRecipes: Recipe[] = []
        if( Object.keys(recipes.firstLevelResults).length < 5){
            const keys = await getAllKeysFromWords(phrase)
            const externalRecipes = await Promise.allSettled(keys.map((key:string) => getRecipeListByKey(key)))
            newRecipes = await translateAndReturnExternalRecipeIfNotExist(externalRecipes)
        }

        return [
            ...newRecipes,
            ...Object.values(recipes.firstLevelResults),
            ...Object.values(recipes.secondLevelResults),
            ...Object.values(recipes.thirdLevelResults),
            ]
    } catch (error) {
        console.error(error)
        throw new Error('Something went wrong' )
    }
}
