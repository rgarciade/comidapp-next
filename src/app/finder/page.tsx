'use client'
import IconComp from "@/app/components/iconComp";
import {Category, Recipe} from "@prisma/client";
import { CategoryCard } from "../components/categoryCard";
import React, {useEffect, useState} from "react";
import FindBar from "@/app/finder/components/findBar";
import {getCategories} from "@/app/backend/recipe/serverActions/getCategories";



interface finderParams {
    params: {
        id: string
    }
}


export default function Finder({params}:finderParams): any{
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect( () => {
        getCategories().then((cat) => {
            console.log(cat)
            setCategories(cat)
        })
    }, [])

    const search = params.id
    // const router = useRouter()
    // const paramss = router.query
    // console.log('paramss',paramss)
    const handleValueFromChild = (value:any) => {
        console.log("Valor recibido del hijo: ", value);
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
                    <FindBar sendValueToParent={handleValueFromChild}/>
                </div>
                <section>
                    <h3 className="pt-10  font-semibold">Categorías</h3>
                    <div className="flex overflow-x-auto pt-6  pb-4 gap-4 items-center">
                        <CategoryCard key="1" category="all" selected={selected}/>
                        {categories.map((category:Category) => (
                            <CategoryCard key={category.id} category={category.name}/>
                        ))}
                    </div>
                </section>
            </div>

        </>
    )
}
