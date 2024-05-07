'use client'
import {useEffect, useState} from "react";
import findRecipes from "@/app/backend/recipe/serverActions/findRecipes";
import {Recipe} from "@prisma/client";



export default function FindBar({sendValueToParent,initialSearch}: {sendValueToParent: (value:any) => void, initialSearch:string | null}){
    const [search, setSearch] = useState<string>('');
    const searchRecipes = async (search:string) => {
        const results = await findRecipes(search,20)
        console.log(results)
        sendValueToParent(results)
    }
    const changeFinder = async  (event:any) =>{

        if(event.keyCode === 13){
            const search = event.target.value
            searchRecipes(search).catch((error) => {
                console.error(error)
            })
        }
    }

    useEffect(() => {
        if(!initialSearch || initialSearch === '') return
        setSearch(initialSearch)
        searchRecipes(initialSearch).catch((error) => {
            console.error(error)
        })
    }, [initialSearch])

    return (
        <input type="search" id="default-search"
               className=" bg-white block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full"
               placeholder="Busca alguna receta"
               onKeyDown={(e) => changeFinder(e)}
               onChange={(e) => setSearch(e.target.value)}
                value={search}
        />
    )
}
