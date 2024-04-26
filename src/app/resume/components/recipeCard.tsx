'use client'

import Link from "next/link";
import {Recipe} from "@prisma/client";



export const RecipeCard = ({recipe}:{recipe:Recipe}) => {
    debugger
    return (
        <Link href={`/recipe/${recipe.id}`}>
            <div className=" h-40 w-32 pr-4">
                <img className="h-40 object-cover rounded-xl"
                     src={recipe?.image?? 'https://www.comedera.com/wp-content/uploads/2021/12/ensalada-de-lechuga1.jpg'}/>
                <p className="pt-2">{recipe.title}</p>
            </div>
        </Link>
    )
}
