'use client';

import IconComp from "./iconComp";
import {useEffect, useState} from "react";

function StartCooking () {
    const [seeStartCooking, setSeeStartCooking] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            //setSeeStartCooking(window.scrollY >= 1);
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // useEffect(() => {
    //     if (document.documentElement.scrollHeight <= window.innerHeight) {
    //         setSeeStartCooking(true);
    //     } else {
    //         setSeeStartCooking(false);
    //     }
    // }, [ingredients]);
    return (
        <>

                <div
                    id="start"
                    className="h-16 w-11/12 bg-primary object-center rounded-full place-self-center flex gap-2 items-center justify-center fixed bottom-6 ml-auto mr-auto left-0 right-0"
                >
                    <IconComp icon="right-arrow-white" class="h-10 border-2 p-2 rounded-full"/>
                    <p className="text-white font-extrabold">¿Listo? Comenzar a cocinar</p>
                </div>

        </>
    );
}
export default StartCooking;
