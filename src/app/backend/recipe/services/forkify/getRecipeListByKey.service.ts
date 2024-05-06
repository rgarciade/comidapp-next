import {ApiResponse} from "@/app/backend/recipe/interfaces/forkity";

export async function getRecipeListByKey(text: string): Promise<ApiResponse>{
    const { FORKIFY_URL,FORKIFY_API_KEY } = process.env
    const response = await fetch(`${FORKIFY_URL}/?search=${text}&key=${FORKIFY_API_KEY}`).catch((error) => {
        throw new Error(error)
    })

    return response.json()
}
