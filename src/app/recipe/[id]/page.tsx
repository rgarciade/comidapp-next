import IconComp from "../../components/iconComp";
import {StartCooking} from "./components/startCooking";
import {getRecipe} from "../../backend/recipe/controllers/getRecipe.controller";
import Labels from "../components/labels";
import PropTypes from "prop-types";
import {Recipe, PreparationStep} from "@prisma/client";
import {Metadata} from "next";

export const dynamic = 'auto'


interface Params {
    params: {id: string}
}
export async function generateMetadata({params}: Params): Promise<Metadata> {
    const { id } = params;
    const recipe:Recipe | any  = await getRecipe(id)
    const name = recipe.title
    const ingredients = recipe.recipeIngredients.map((ingredient:Recipe | any) => ingredient.IngredientType.name)
    return {
        title: `Receta ${name}`,
        description: `Receta ${name}`,
        keywords: [
            name,
                ...ingredients
        ]
    }
}

export default async function Recipe({params} : Params) {

    const { id } = params;

    const recipe:Recipe | any  = await getRecipe(id)
    const ingredients = recipe.recipeIngredients
    const steps = recipe.preparationSteps
    const name = recipe.title
    const preparationTime = recipe.preparationTime
    const rations = recipe.rations

    return (
        <>
            <div className="flex-col h-screen pb-40 ">
                <div className="flex-none h-3/6">
                    <IconComp
                        icon="bookmark"
                        classData="w-14 absolute right-4 bg-white rounded-full p-2 top-3"
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

                        <Labels cookingTime={preparationTime} rations={rations}/>

                        <IconComp icon="add" classData="w-10"/>
                    </div>
                    <div id="ingredients" className="pt-5 pb-12">
                        <h3 className="font-bold pb-2 pt-2">Ingredientes</h3>
                        {ingredients.map((ingredient:Recipe | any , index:number) => (
                            <ul key={index} className="list-none text-2xl">
                                <li
                                    className="pt-3 flex gap-2"
                                >
                                    <IconComp icon="check" classData="w-8 h-8"/>
                                    <p>
                                        {ingredient.units} {ingredient.IngredientType.name}
                                    </p>
                                </li>
                            </ul>
                        ))}

                    </div>
                    <div id="steps" className="pt-5 pb-28">
                        <h3 className="font-bold pb-2 pt-2">Pasos</h3>
                        <ul className="list-none text-2xl">
                            {steps.map((step: PreparationStep, index: number) => (
                                <li key={index}
                                    className="pt-3 flex gap-2">
                                    <span className="w-4 mt-4 mb-4 h-1 bg-primary"></span>
                                    <p>
                                        {step.step}
                                    </p>
                                </li>
                            ))}

                        </ul>
                        <StartCooking/>
                    </div>

                </div>

            </div>
        </>
    );
}
Recipe.propTypes = {
    params: PropTypes.object.isRequired,
}

