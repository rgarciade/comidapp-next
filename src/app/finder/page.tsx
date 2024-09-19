'use client'
import IconComp from "@/app/components/iconComp";
import {Category, Recipe} from "@prisma/client";
import { CategoryCard } from "../components/categoryCard";
import React, {useEffect, useState} from "react";
import FindBar from "@/app/finder/components/findBar";
import {getCategories} from "@/app/backend/recipe/serverActions/getCategories";
import {RecipeCardFinder} from "@/app/finder/components/recipeCardFinder";
import { useSearchParams } from 'next/navigation'
import {findRecipesByCategory, findRecipesByCategoryId} from "@/app/backend/recipe/serverActions/findRecipes";


export default function Finder(): any{
    const [categories, setCategories] = useState<Category[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [search, setSearch] = useState<string>('');
    useEffect( () => {
        getCategories().then((cat) => {
            setCategories(cat)
        })
        setSearch(searchParams.get('search')??'')
    }, [])

    const searchParams = useSearchParams()


    const handleValueFromChild = (recipes:Recipe[]) => {
        console.log("Valor recibido del hijo: ", recipes);
        setRecipes(recipes)
    }

    const setRecipesByCategory = async (categoryId:string) => {
        const recipes = await findRecipesByCategory(categoryId)
        if(!recipes.length){
            console.log('no recipes found')
            return
        }
        console.log('recipes by category', recipes)
        setRecipes(recipes)
    }

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
                    <FindBar sendValueToParent={handleValueFromChild} initialSearch={search}/>
                </div>
                <section>
                    <h3 className="pt-10  font-semibold">Categorías</h3>
                    <div className="flex overflow-x-auto pt-6  pb-4 gap-4 items-center">
                        <CategoryCard key="1" category="all" selected={selected}/>
                        {categories.map((category:Category) => (
                            <CategoryCard key={category.id} category={category.name} onClick={async () => await setRecipesByCategory(category.id)}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="pt-10  font-semibold">Recetas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  lg:pl-24 lg:pr-24 gap-4 items-start ">
                        {recipes.map((recipe: Recipe, index) => (
                            <RecipeCardFinder key={index} recipe={recipe}/>
                        ))}
                    </div>
                </section>
            </div>

        </>
    )
}
