import {NextResponse} from "next/server";
import {getAllRecipes} from "../../backend/recipe/controllers/getAllRecipes.controller";

export async function GET(req, res) {
    const recipes = await getAllRecipes();
    return NextResponse.json(recipes);
}
