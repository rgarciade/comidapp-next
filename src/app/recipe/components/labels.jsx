import InfoComp from "../../components/infoComp";
import PropTypes from "prop-types";
import { FaChartSimple } from "react-icons/fa6";
import IconComp from "@/app/components/iconComp";

export default function Labels({cookingTime, rations, difficulty}) {
    return (
        <div className="flex justify-between w-full  gap-4">
            <div className="flex gap-2">
                <div id="cooking-time" className="flex-none">
                    <InfoComp
                        text={cookingTime + " minutos"}/>
                </div>
                <div id="servings" className="flex-none">
                    <InfoComp
                        text={rations + " raciones"}/>
                </div>
                <div id="difficulty" className={`flex-col content-center items-center flex`} >
                    <FaChartSimple  />
                    <p className="pl-1 text-sml">{difficulty}</p>
                </div>
            </div>

            <IconComp icon="add" classData="w-10"/>
        </div>
    )
}
Labels.propTypes = {
    cookingTime: PropTypes.number.isRequired,
    rations: PropTypes.number.isRequired,
};
