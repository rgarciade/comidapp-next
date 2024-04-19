'use client';

import IconComp from "../iconComp";
import {useEffect, useState} from "react"

export const StartCooking = () => {

    return (
        <>
                <div
                    id="start"
                    className={`  pl-2 pr-2 max-w-80 mt-11 h-16 bg-primary rounded-full place-self-center flex gap-2 items-center  bottom-20 justify-cent ml-auto mr-auto left-0 right-0 bg-gradient-to-t from-primary to-secondary`}
                >
                    <>
                        <IconComp icon="right-arrow-white" class="h-10 border-2 p-2 rounded-full"/>
                        <p className={`text-white font-extrabold`}>¿Listo? Comenzar a cocinar</p>
                    </>
                </div>
        </>
    );
}
