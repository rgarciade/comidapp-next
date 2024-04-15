'use client';

import IconComp from "../components/iconComp";
import InfoComp from "../components/infoComp";
import {useParams} from "next/navigation";
import {useEffect} from "react";
//import {useRecipeStore} from "../../hooks/storeHooks/useRecipeStore";
//import {useParams} from "react-router-dom";

function Recipe() {
    const [seeStartCooking, setSeeStartCooking] = useState(false);
  //  const {ingredients, steps, name, cookingTime, servings, getById} = useRecipeStore();
    const ingredients = []
    const steps = []
    const name = "Ensalada de lechuga"
    const cookingTime = "10 minutos"
    const servings = 4
    //get recipeId from url
    //const {id: recipeId} = useParams();
    useEffect(() => {
        const handleScroll = () => {
            setSeeStartCooking(window.scrollY >= 1);
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (document.documentElement.scrollHeight <= window.innerHeight) {
            setSeeStartCooking(true);
        } else {
            setSeeStartCooking(false);
        }
    }, [ingredients]);

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
                        <div className="flex w-11/12 gap-4 pr-44">
                            <div id="cooking-time" className="flex-none">
                                <InfoComp
                                    text={cookingTime}/>
                            </div>
                            <div id="servings" className="flex-none">
                                <InfoComp
                                    text={servings + " raciones"}/>
                            </div>
                        </div>
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
            {seeStartCooking && (
                <div
                    id="start"
                    className="h-16 w-11/12 bg-primary object-center rounded-full place-self-center flex gap-2 items-center justify-center fixed bottom-6 ml-auto mr-auto left-0 right-0"
                >
                    <IconComp icon="right-arrow-white" class="h-10 border-2 p-2 rounded-full"/>
                    <p className="text-white font-extrabold">¿Listo? Comenzar a cocinar</p>
                </div>
            )}

        </>
    );
}

export default Recipe;
