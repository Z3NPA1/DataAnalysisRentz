import { Link } from "react-router-dom"
import NavBar from "./components/Navbar"

export default function LandingPage() {
    return(
        <main className="scrollbar-hide">

            <NavBar />

            <section className='w-screen h-screen flex items-center'>
                
                
                <section className="w-1/2 h-full flex justify-center items-center">
                    <div className="flex flex-col w-[80%] h-full">
                        <ul className="mt-40 tracking-wider text-lg text-lgray2 drop-shadow-lg">
                            <li>search from over 200 plus rooms</li>
                            <li>selected room tours</li>
                            <li>happy finding rooms</li>
                        </ul>
                        <h1 className="mt-5 py-8  text-7xl text-lgray2 drop-shadow-lg  font-Playfair tracking-wide border-r border-black">
                            Lets find you a <span className="text-goodGreen">room</span>
                        </h1>

                        <div className="flex gap-5 mt-10">
                            
                            <Link to='/'>
                            <button className="border-2 border-goodGreen text-goodGreen p-5 rounded-3xl font-medium
                                                hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                                    Get Room Tours
                            </button>
                            </Link>

                            <Link to='catalouge'>
                            <button className="bg-goodGreen text-white py-5 px-8 rounded-3xl font-medium
                                                hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                                    Book A Room
                            </button>
                            </Link>
                        </div>

                        <div className="w-full h-[16%] mt-7 flex gap-3 items-end">

                            {/* <p className="bg-ggray w-[12%] h-full "></p>
                            <p className="bg-lgray w-[12%] h-[80%]"></p>
                            <p className="bg-ggray w-[12%] h-[90%] "></p>
                            <p className="bg-lgray w-[12%] h-full "></p>
                            <p className="bg-ggray w-[12%] h-[70%] "></p>
                            <p className="bg-lgray w-[12%] h-full "></p>
                            <p className="bg-ggray w-[12%] h-[30%] "></p>
                            <p className="bg-lgray w-[12%] h-full "></p> */}
                            
                        </div>
                    </div>
                </section>


                <section className="w-1/2 h-full flex flex-col  justify-center items-center">

                    <div className="flex">
                        <h1 className="relative font-Playfair text-9xl tracking-wider py-10 px-5 text-ggray drop-shadow-lg">Rentz</h1>
                        <ul className="flex flex-col justify-center mt-14 font-light text-sm">
                            <li>Comfort</li>
                            <li>Quality</li>
                            <li>Best in class</li>
                        </ul>
                    </div>

                    <Link to='Apartment_Registration'>
                    <button className="bg-goodGreen text-white py-5 px-24 rounded-xl font-medium mr-16">Register Your Building</button>
                    </Link>
                </section>
            </section>

            <footer className="w-full h-[300px] bg-dblue"></footer>

        </main>
    )
}