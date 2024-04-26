import {translate} from "@/app/backend/services/translate";


export async function getFortikyRecipeList(text: string) {
    try {
        return translate({text:"i'm a recipe list"})
    } catch (error) {
        if(error instanceof Error && error.message === 'Recipe not found') {
            return { error: error.message }
        }
        return { error: 'Something went wrong' }
    }
}
