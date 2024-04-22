import styles from './NavigationBar.module.css';
import IconComp from "@/app/components/iconComp";
import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

export const NavigationBar = () => {
    return (
        <>
            <div className={styles.bottomNav}>
                <Link href={`/`}>
                    <div className="flex flex-col items-center">
                        <TiHome class="w-6 h-6"/>
                    </div>
                </Link>
                <Link href={`/recipe/2`}>
                    <div className="flex flex-col items-center">
                        <IconComp
                            icon="bookmark"
                            class="w-6 h-6"
                        />
                    </div>
                </Link>
                <Link href={`/recipe/3`}>
                    <div className="flex flex-col items-center">
                        <FaUser class="w-6 h-6"/>
                    </div>
                </Link>
            </div>
        </>
    )
}
