'use client';

import IconComp from "../iconComp";
import styles from './startCooking.module.css';
import {useEffect, useState} from "react"

export const StartCooking = () => {
    const [seeStartCooking, setSeeStartCooking] = useState(false);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setSeeStartCooking(window.scrollY >= 1);
            window.removeEventListener('scroll', handleScroll);
        };
        window.addEventListener('scroll', handleScroll);
        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        if (document.documentElement.scrollHeight <= window.innerHeight){
            setSeeStartCooking(true);
        }
    }, []);
    useEffect(() => {
            const timer = setTimeout(() => {
                setAnimate(true);
            }, 4000);
            return () => clearTimeout(timer);
    }, [seeStartCooking]);
    return (
        <>
            {seeStartCooking && (

                <div
                    id="start"
                    className={`${animate ? styles.start: ' '}  pl-2 pr-2  h-16 bg-primary object-center rounded-full place-self-center flex gap-2 items-center justify-center fixed bottom-20 ml-auto mr-auto left-0 right-0`}
                >
                    <>
                        <IconComp icon="right-arrow-white" class="h-10 border-2 p-2 rounded-full"/>
                        <p className={` ${animate ? styles.text :''} text-white font-extrabold`}>¿Listo? Comenzar a cocinar</p>
                    </>
                </div>
            )}
        </>
    );
}
