
import Link from "next/link";
import {Recipe} from "@prisma/client";
import {TagExternal} from "@/app/components/tagExternal";



export const RecipeCardFinder = ({recipe}:{recipe:Recipe}) => {
    return (
        <Link href={`/recipe/${recipe.id}`}>
            {recipe.externalUrl && <TagExternal/>}
            <div className="min-w-40 w-40 flex flex-col items-center justify-center">
                <img className="max-h-32 h-32 min-w-40 w-40 object-cover rounded-xl"
                     src={recipe?.image?? 'https://www.comedera.com/wp-content/uploads/2021/12/ensalada-de-lechuga1.jpg'}/>
                <p className="pt-10 max-w-52">{recipe.title}</p>
            </div>
        </Link>
    )
}
