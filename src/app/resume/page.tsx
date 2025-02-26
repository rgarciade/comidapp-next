import IconComp from "@/app/components/iconComp";
import {getTopRecipes} from "@/app/backend/recipe/controllers/getTopRecipes";
import { getAllCategory } from "@/app/backend/recipe/controllers/category/getAllCategory.controller";
import { RecipeCard } from "./components/recipeCard";
import { CategoryCard } from "../components/categoryCard";
import {Category, Recipe} from "@prisma/client";
import type {Metadata} from "next";
import FindBarResume from "@/app/resume/components/findBarResume";

export const metadata: Metadata = {
    title: "ComidAppp",
    description: "Find your favorite recipes",
};

export default async function Resume(): Promise<any> {
    const categories:Category[] = await getAllCategory()
    const topRecipes:Recipe[] = await getTopRecipes()
    const selected = true

    return (
        <>
            <div className="pl-6 pr-6 pt-10 pb-44">
                <p className="text-gray-400 text-1xl">Hola</p>
                <h2 className="w-2/3 leading-8 font-semibold">¿Que te gustaría cocinar hoy?</h2>
                <div className="relative pt-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pt-6 pointer-events-none">
                        <IconComp icon="magnifying-glass" classData="w-4 h-6 text-gray-500  "/>
                    </div>
                    <FindBarResume />
                </div>
                <section>
                    <h3 className="pt-10  font-semibold">Categorías</h3>
                    <div className="flex overflow-auto pt-6  pb-4 gap-4 items-center">
                        <CategoryCard key="1" category="all" selected={selected}/>
                        {categories.map((category:Category) => (
                            <CategoryCard key={category.id} category={category.name}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="pt-2  font-semibold">Recomendaciones</h3>
                    <div className="flex  pt-6 overflow-x-auto min-h-80 overflow-y-hidden bg-primary-white">
                        {topRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe}/>
                        ))
                        }
                    </div>
                </section>
            </div>

        </>
    )
}
