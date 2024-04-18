import styles from './NavigationBar.module.css';
import IconComp from "@/app/components/iconComp";
import Link from "next/link";

export const NavigationBar = () => {
    return (
        <>
            <div className={styles.bottomNav}>
                <Link href={`/recipe/1`}>
                    <div className="flex flex-col items-center">
                        <IconComp icon="icono1" class="w-6 h-6"/>
                        <p>Ruta 1</p>
                    </div>
                </Link>
                <Link href={`/recipe/2`}>
                    <div className="flex flex-col items-center">
                        <IconComp icon="icono2" class="w-6 h-6"/>
                        <p>Ruta 2</p>
                    </div>
                </Link>
                <Link href={`/recipe/3`}>
                    <div className="flex flex-col items-center">
                        <IconComp icon="icono3" class="w-6 h-6"/>
                        <p>Ruta 3</p>
                    </div>
                </Link>
            </div>
        </>
    )
}
