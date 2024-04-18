import IconComp from "@/app/components/iconComp";
import {getTopRecipes} from "../backend/recipe/controllers/getTopRecipes";
import { RecipeCard } from "./components/recipeCard";

export default async function Finder(): Promise<any> {
   const topRecipes = await getTopRecipes()
    return (
        <>
            <div className="pl-6 pr-6 pt-10 bg-primary pb-44">
                <p className="text-gray-400 text-1xl">Hola</p>
                <h2 className="w-2/3 leading-8 font-semibold">¿Que te gustaría cocinar hoy?</h2>
                <div className="relative pt-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pt-6 pointer-events-none">
                        <IconComp icon="magnifying-glass" class="w-4 h-6 text-gray-500  "/>
                    </div>
                    <input type="search" id="default-search"
                           className=" bg-white block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full"
                           placeholder="Busca alguna receta" required/>
                </div>
                <h3 className="pt-6  font-semibold">Recomendaciones</h3>
                <div className="flex  pt-6">
                    {topRecipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))
                    }
                </div>
                <div className="flex  pt-6">
                    {topRecipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))
                    }
                </div>
                <div className="flex  pt-6">
                    {topRecipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))
                    }
                </div>
                <div className="flex  pt-6">
                    {topRecipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id} recipe={recipe}/>
                    ))
                    }
                </div>
            </div>

        </>
    )
}
