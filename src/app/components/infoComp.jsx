import PropTypes from "prop-types";
function InfoComp({text}) {
    return (
        <div id="servings" className="bg-amber-100 p-2 pl-4 pr-4 rounded-full text-sm">
            {text}
        </div>
    );
}
InfoComp.propTypes = {
    text: PropTypes.string.isRequired,
};
export default InfoComp;
