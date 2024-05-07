'use client';
import styles from './NavigationBar.module.css';
import IconComp from "@/app/components/iconComp";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { usePathname } from "next/navigation";

export const NavigationBar = () => {
    const currentPath = usePathname();
    const actualRouteStyle =(patch) =>{
        if(currentPath === patch){
            return "blue";
        }
    }

    const menuItems = [
        {
            path: '/resume',
            icon: <TiHome size={25} title="Resume"  color={actualRouteStyle('/resume')} />,
        },
        {
            path: '/finder',
            icon: <SlMagnifier size={25}  title="Buscador"color={actualRouteStyle('/finder')} />,
        },
        {
            path: '/ejemplo1',
            icon: <IconComp classData={`w-6 h-6 ${actualRouteStyle('/ejemplo1')}`} icon="bookmark" title="Favoritos" color={actualRouteStyle('/ejemplo1')} />,
        },
        // {
        //     path: '/ejemplo1',
        //     icon: <FaUser size={40} {...props}/>,
        //     title: 'Usuario',
        //     subTitle: 'Pagina de usuario'
        // },
    ]

    return (
        <>
            <div className={`${styles.bottomNav} rounded-xl w-11/12 left-4 right-4 bottom-3`}>
                {menuItems.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div className="flex flex-col items-center blue">
                            {item.icon}
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
