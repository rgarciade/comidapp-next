
import Link from "next/link";
import {Recipe} from "@prisma/client";
import {TagExternal} from "@/app/components/tagExternal";



export const RecipeCard = ({recipe}:{recipe:Recipe}) => {
    return (
        <Link href={`/recipe/${recipe.id}`}>
            {recipe.externalUrl && <TagExternal/>}
            <div className="h-40 w-32 pr-4">
                <img className="h-40 w-32 object-cover rounded-xl"
                     src={recipe?.image?? 'https://www.comedera.com/wp-content/uploads/2021/12/ensalada-de-lechuga1.jpg'}/>
                <p className="pt-2">{recipe.title}</p>
            </div>
        </Link>
    )
}
