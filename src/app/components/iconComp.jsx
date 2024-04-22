import PropTypes from "prop-types";

function getIcon(icon) {
    return `/assets/icons/${icon}.svg`;
}

function IconComp({...props}) {
    return (
        <img className={props.classData} src={getIcon(props.icon)} alt={props.icon}/>
    );
}

IconComp.propTypes = {
    icon: PropTypes.string.isRequired,
    classData: PropTypes.string.isRequired,
};

export default IconComp;
