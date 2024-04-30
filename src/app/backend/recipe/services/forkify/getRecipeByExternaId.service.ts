import {ApiResponse, ApiResponseIndividualRecipe} from "@/app/backend/recipe/interfaces/forkity";

export async function getRecipeByExternalId(id: string): Promise<ApiResponseIndividualRecipe> {
    const { FORKIFY_URL,FORKIFY_API_KEY } = process.env
    const response = await fetch(`${FORKIFY_URL}/${id}/?key=${FORKIFY_API_KEY}`).catch((error) => {
        throw new Error(error)
    })

    return response.json()
}
