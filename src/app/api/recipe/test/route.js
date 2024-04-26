import {NextResponse} from "next/server";

import {getFindAllRecipes} from "../../../backend/recipe/controllers/getFindAllRecipes.controller";

export async function GET(req, res) {
    const recipes = await getFindAllRecipes('pizza de tomate');
    return NextResponse.json(recipes);
}
