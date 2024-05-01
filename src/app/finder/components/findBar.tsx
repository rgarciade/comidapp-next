'use client'
import { useSearchParams } from 'next/navigation'
import findRecipes from "@/app/backend/recipe/serverActions/findRecipes";



export default function FindBar({sendValueToParent}: {sendValueToParent: (value:any) => void}){
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const find = async  (event:any) =>{
        //si la tecla pulsada es enter
        console.log("keyCode",event.keyCode)
        if(event.keyCode === 13){
            console.log("entra")
            const search = event.target.value
            const results =await findRecipes(search,20)
            console.log(results)
            sendValueToParent(results)
        }
    }

    return (
        <input type="search" id="default-search"
               className=" bg-white block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full"
               placeholder="Busca alguna receta"
               onKeyDown={(e) => find(e)}
        />
    )
}
