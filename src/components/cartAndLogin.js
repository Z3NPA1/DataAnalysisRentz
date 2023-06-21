import { useState } from "react"
import { Link } from "react-router-dom"

export const CartLogin = (props) =>{

    const [toggle,setToggle] = useState(false)

    return(
        <section className="relative text-musYellow flex gap-5 items-center font-light">

                            <div className="bg-musYellow text-white px-4 rounded-lg py-1">
                                <h1 onClick={() => setToggle(prev => !prev)} className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>({props.cartItem.length})
                                </h1>
                                <p className={`${toggle ? 'flex flex-col absolute bg-musYellow mt-3 left-0 py-5 w-[210px] px-4 rounded-lg shadow-md shadow-gray-600 transition-all duration-100' : 'absolute mt-3 translate-x-52 bg-musYellow hidden'}`}>
                                    <span className="text-center font-medium text-ggray text-lg">{props.cartItem.length === 0 ?'Your cart is empty': `Total tour price:${props.cartItem.length * 100}`}</span>
                                    <button className="border border-white mt-5 text-lg font-light">See selected rooms</button>
                                </p>
                            </div>
                            <Link to='login'>
                            <button>Login/SignUp</button>
                            </Link>
        </section>
    )
}