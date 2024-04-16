
import IconComp from "../../components/iconComp";
import StartCooking from "../../components/startCooking";
// import { usePathname } from "next/navigation";
import {getRecipe} from "../../backend/recipe/controllers/getRecipe.controller";
import Labels from "../components/labels";
//import {labels} from "../components/labels";


export default async function Recipe() {
    const ingredients = []
    const steps = []
    const name = "Ensalada de lechuga"
    // const cookingTime = "10 minutos"
    // const servings = 4
    const recipe = await getRecipe('clv2h6s8e0005dejsdcc1s0z2')

    return (
        <>
            <div className="flex-col h-screen ">
                {JSON.stringify(recipe)}
                <div className="flex-none h-3/6">
                    <IconComp
                        icon="bookmark"
                        class="w-14 absolute right-4 bg-white rounded-full p-2 top-3"
                    />

                    <img
                        className="h-full object-cover w-full"
                        src="https://www.comedera.com/wp-content/uploads/2021/12/ensalada-de-lechuga1.jpg"
                        alt="receta"
                    />
                </div>
                <div
                    className="flex-initial h-2/6 rounded-t-3xl -mt-10 w-full absolute bg-white p-10 pt-10"
                >
                    <h3 className="font-bold">{name}</h3>
                    <div id="info" className="flex pt-10 border-b-2 pb-8">

                        <Labels cookingTime={recipe?.preparationTime} rations={recipe?.rations}/>

                        <IconComp icon="add" class="w-10"/>
                    </div>
                    <div id="ingredients" className="pt-5 pb-12">
                        <h3 className="font-bold pb-2 pt-2">Ingredientes</h3>
                        {ingredients.map((ingredient, index) => (
                            <ul key={index} className="list-none text-2xl">
                                <li
                                    className="pt-3 flex gap-2"
                                >
                                    <IconComp icon="check" class="w-8 h-8"/>
                                    <p>
                                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                    </p>
                                </li>
                            </ul>
                        ))}

                    </div>
                    <div id="steps" className="pt-5 pb-28">
                        <h3 className="font-bold pb-2 pt-2">Pasos</h3>
                        <ul className="list-none text-2xl">
                            {steps.map((step, index) => (
                                <li key={index}
                                    className="pt-3 flex gap-2">
                                    <span className="w-4 mt-4 mb-4 h-1 bg-primary"></span>
                                    <p>
                                        {step.name}
                                    </p>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
            </div>
            <StartCooking/>
        </>
    );
}
