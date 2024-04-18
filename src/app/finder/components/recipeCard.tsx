'use client'

import Link from "next/link";

interface Recipe {
    id: string;
    title: string;
    description: string;
    preparationTime: number;
    rating: number;
    rations: number;
    createdAt: Date;
    updatedAt: Date;
};

export const RecipeCard = ({recipe}:{recipe:Recipe}) => {
    return (
        <Link href={`/recipe/${recipe.id}`}>
            <div className=" h-40 w-32 pr-4">
                <img className="h-40 object-cover rounded-xl"
                     src="https://www.comedera.com/wp-content/uploads/2021/12/ensalada-de-lechuga1.jpg"/>
                <p className="pt-2">{recipe.title}</p>
            </div>
        </Link>
    )
}
