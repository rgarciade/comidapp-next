// @ts-ignore
import prisma from '/prisma/index.js'
import {tryCatchDbError} from "@/app/backend/services/dbError";
import {Prisma} from "@prisma/client";
import {translate} from "@/app/backend/services/translate";
import {insertNewRecipe} from "@/app/backend/recipe/repository/recipe-repository";

export interface updateExternalRecipe {
    title?: string,
    description?: string,
    image?: string,
    externalId?: string,
    externalUrl?: string,
    categoryId?: string
    language?: string
}
export interface newExternalRecipe {
    title: string,
    description: string,
    image: string,
    externalId: string,
    externalUrl: string,
    categoryId: string
    language?: string
}


const updateExternalRecipeById = async (externalId:string,data:updateExternalRecipe) =>
        tryCatchDbError(async (externalId:string,data:updateExternalRecipe) => {
            const newRecipe = await prisma.recipe.update({
                where: {
                    externalId: externalId
                },
                data
            })
            return newRecipe
        })(externalId,data)

const insertNewExternalRecipe = async (recipeId:string, JsonData:Prisma.JsonObject) =>
    tryCatchDbError(async (recipeId:string, JsonData:Prisma.JsonObject) => {
        return prisma.externalRecipe.create({
            data: {
                recipeId,
                jsonData:JsonData
            }
        }).catch(async ()=>
            await prisma.externalRecipe.findUnique({
                where: {recipeId}
            })
        )
    })(recipeId, JsonData)

const checkIfExternalIdExist = async (externalRecipeId: string) =>
    tryCatchDbError(async (externalRecipeId: string) => {
        const recipeExist = await prisma.recipe.findUnique({
            where: {
                externalId: externalRecipeId
            }
        })
        return !!recipeExist
    })(externalRecipeId)

const getNewExternalRecipe = async (recipeId:string) =>
    tryCatchDbError(async (recipeId:string) => {
        const recipeExternalData = await prisma.externalRecipe.findUnique({
            where: {
                recipeId
            }
        })
        return recipeExternalData
    })(recipeId)

const insertIfExternalNotExist = async (newExternalRecipe: newExternalRecipe) =>
    tryCatchDbError(async (newExternalRecipe: newExternalRecipe) => {
        const recipeExist =  await prisma.recipe.findUnique({
            where: {
                externalId: newExternalRecipe.externalId
            }
        })
        if (!recipeExist) {
            let title = newExternalRecipe.title.replace(/&amp;/g, '');
            let language = 'en'
            try {
                title = title? await translate({text: title}):title
                language = 'es'
            }catch (e) {
                console.log(e)
            }

            return await insertNewRecipe({
                ...newExternalRecipe,
                description: title,
                title,
                language
            })
        }
        return recipeExist
    })(newExternalRecipe)


export {
    getNewExternalRecipe,
    insertNewExternalRecipe,
    insertIfExternalNotExist,
    updateExternalRecipeById,
    checkIfExternalIdExist
}
