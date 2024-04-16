import InfoComp from "../../components/infoComp";
import PropTypes from "prop-types";

export default function Labels({cookingTime, rations}) {
    return (
        <div className="flex w-11/12 gap-4 pr-44">
            <div id="cooking-time" className="flex-none">
                <InfoComp
                    text={cookingTime + " minutos"}/>
            </div>
            <div id="servings" className="flex-none">
                <InfoComp
                    text={rations + " raciones"}/>
            </div>
        </div>
    )
}
Labels.propTypes = {
    cookingTime: PropTypes.number.isRequired,
    rations: PropTypes.number.isRequired,
};
