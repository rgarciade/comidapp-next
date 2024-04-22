import PropTypes from "prop-types";

const  getIcon = (category:string) =>{
    return `/assets/category/${category}.png`;
}
const textSize = (text:string) =>{
    if(text.length > 6){
        return " pr-4 pl-4"
    }
    return ""
}

interface Params {
    category: string
}

export const CategoryCard = ({category}:Params)  =>{
    return (
        <div className="rounded-xl  min-w-16 w-16 h-16 bg-white pt-2
                flex-col content-center items-center flex
                ">
            <img className="h-8 " src={getIcon(category)} alt={category}/>
            <p className={` text-xs pt-1 pb-1 text-gray-400 text-ellipsissm ${textSize(category)}`}>{category}</p>
        </div>

    );
}
