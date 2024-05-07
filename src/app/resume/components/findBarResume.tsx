'use client'
import { useState} from "react";
import { useRouter } from 'next/navigation'


export default function FindBarResume(){
    const [search, setSearch] = useState<string>('');
    const router = useRouter()
    const searchRecipes =  (search:string) => {
        router.push('/finder?search='+search)
    }
    const changeFinder = async  (event:any) =>{
        console.log('fas',event.keyCode)
        if(event.keyCode === 13){
            debugger
            const search = event.target.value
            searchRecipes(search)
        }
    }

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
