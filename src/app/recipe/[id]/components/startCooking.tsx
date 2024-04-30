'use client';

import IconComp from "../../../components/iconComp";
import {func} from "prop-types";

function GoToExternalUrl(externalUrl) {
    if(externalUrl === undefined) return;
    window.open(externalUrl, '_blank');
}
interface StartCookingProps {
    externalUrl?: string
}

export const StartCooking = ({externalUrl}:StartCookingProps) => {

    return (
        <>
                <div
                    id="start"
                    className={`shadow-lg  pl-2 pr-2 max-w-80 mt-11 h-16 bg-primary rounded-full place-self-center flex gap-2 items-center  bottom-20 justify-cent ml-auto mr-auto left-0 right-0 bg-gradient-to-t from-primary to-secondary`}
                    onClick={() => GoToExternalUrl(externalUrl)}
                >
                    <>
                        <IconComp icon="right-arrow-white" classData="h-10 border-2 p-2 rounded-full"/>
                        <p className={`text-white font-extrabold`}>¿Listo? Comenzar a cocinar</p>
                    </>
                </div>
        </>
    );
}
