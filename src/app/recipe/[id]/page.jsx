import IconComp from "../../components/iconComp";
import StartCooking from "../../components/startCooking";
import {getRecipe} from "../../backend/recipe/controllers/getRecipe.controller";
import Labels from "../components/labels";
import PropTypes from "prop-types";

export const metadata= {
    title: "Receta",
    description: "Receta de ensalada de lechuga",
}

export default async function Recipe({params}) {

    const { id } = params;

    const recipe = await getRecipe(id)
    const ingredients = recipe.recipeIngredients
    const steps = recipe.preparationSteps
    const name = recipe.title
    const preparationTime = recipe.preparationTime
    const rations = recipe.rations

    return (
        <>
            <div className="flex-col h-screen ">
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

                        <Labels cookingTime={preparationTime} rations={rations}/>

                        <IconComp icon="add" class="w-10"/>
                    </div>
                    <div id="ingredients" className="pt-5 pb-12">
                        <h3 className="font-bold pb-2 pt-2">Ingredientes</h3>
                        {ingredients.map((ingredient, index) => (
                            <ul key={ingredient.id} className="list-none text-2xl">
                                <li
                                    className="pt-3 flex gap-2"
                                >
                                    <IconComp icon="check" class="w-8 h-8"/>
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
                            {steps.map((step) => (
                                <li key={step.id}
                                    className="pt-3 flex gap-2">
                                    <span className="w-4 mt-4 mb-4 h-1 bg-primary"></span>
                                    <p>
                                        {step.step}
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
Recipe.propTypes = {
    params: PropTypes.object.isRequired,
}

