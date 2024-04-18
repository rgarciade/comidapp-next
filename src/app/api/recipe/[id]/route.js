import {NextResponse} from "next/server";
import {getRecipe} from "../../../backend/recipe/controllers/getRecipe.controller";

export async function GET(res, req) {
    const id = req?.params?.id;

    const recipe = await getRecipe(id);
    return NextResponse.json(recipe);
}
