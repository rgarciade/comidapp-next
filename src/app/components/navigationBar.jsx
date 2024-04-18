import IconComp from "@/app/components/iconComp";

export const NavigationBar = () => {
    return (
        <>
            <section className="flex-col elemento-padre">
                <div className="flex justify-center items-center bg-primary-white elemento-superior ">
                    <p className="bg-white min-w-full h-14 rounded-tr-full navigator-first-line-1 aaa"></p>
                    <div className="button-add">
                        <p className="w-16 h-16 bg-secondary text-cyan-50 flex justify-center items-center
                       rounded-full  text-3xl min-w-8">+</p>
                    </div>
                    <p className="bg-white min-w-full h-14 rounded-tl-full navigator-first-line-3 aaa"></p>
                </div>
                <div className="flex  ">
                    <p className="lareral-izquierda  bg-white"></p>
                    <div className="square"></div>
                    <p className="lareral-right  bg-white"></p>
                </div>
            </section>
        </>
)
}
