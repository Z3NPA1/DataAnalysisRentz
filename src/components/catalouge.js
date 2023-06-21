// improve filter algorithm 
// optimized version for all cases
//make structured checkes in card data ,runs less number of loops
//this code and be very short motherfucker

import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import RoomCard from "./card";
import data from "../data";
import {CartLogin}  from "./cartAndLogin";
import { eventData } from "../utils/firebase";


export default function Catalouge(props){
    const [rooms,setRooms] = useState([])
    const [detailDisplay,setDetail] = useState(false)
    const [selectedRoom,setSelectedRoom] = useState({
        price:'',
        id:'',
        
    })

  
    
    const [filterToggel,setToggleF] = useState(false)
    const [filteredOptions,setOptions] = useState({
        priceF:'',
        bhkF:''
    })





    useEffect(() =>{
        setRooms(data)
    },[])

    // this function is being called in card.js  for side detail display

    const sideBar = (price,id) =>{

        setSelectedRoom(prev =>({
            ...prev,
            price:price,
            id:id
            
        }))
    }

    const toggle = (id,price) =>{
        sideBar(price,id)
        setDetail(true)
    }



    
    
    
    
    const [imgNumber,setNumber] = useState(0)
    
    const linkArr = ["https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1669799.jpg&fm=jpg","https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYK0nz46fEm_QEWkswFDhnxMtOU0RqeVqKt7UK6BybDNYAupHIovZv1DMfxi0lJxZWjN8&usqp=CAU"]
    
    const imgDisplayCounter = () =>{
        
        if(imgNumber >= linkArr.length - 1) setNumber(0)
        else setNumber(prev => prev += 1)
    }
    
    const tourClickHandler = () =>{
        props.setCart(prev => ([
            ...prev,
            selectedRoom.id
        ]))        
    }
    
    //--------------- filter code-------------------
    
    
    const filterChangeHanler = (e) =>{
        
        const {id,value} = e.target
        setOptions(prev =>({
            ...prev,
            [id]:value
        }))
        
        // console.log(filteredOptions)
        if((filteredOptions.priceF === 'All pricess' && filteredOptions.bhkF == 'All bhk')) {
            setToggleF(false)
        }
        else setToggleF(true)
        
    }
    
    
    
    const showRooms = rooms.map(item =>{

        if(filterToggel === true){
            let lowPrice = filteredOptions.priceF.slice(0,4)
            let highPrice = filteredOptions.priceF.slice(5,10)
            let priceString = item.price.slice(0,1) + item.price.slice(2,)
            console.log(priceString)
            
            if(filteredOptions.priceF === '' || filteredOptions.priceF === 'All prices' || (priceString >= lowPrice && priceString <= highPrice)){
                 console.log(filteredOptions)
                if(filteredOptions.bhkF === ''  || filteredOptions.bhkF === 'All bhk' || item.type === filteredOptions.bhkF){
                     console.log('found')
                    return(
                        <RoomCard 
                            key={item.id}
                            id={item.id}
                            type={item.type}
                            features={item.features}
                            location={item.location}
                            price={item.price}
                            setDetail={setDetail}
                            detailDisplay={detailDisplay}
                            sideBar={sideBar}
                            setCart={props.setCart}
                            cartItem={props.cartItem}
                            toggle={toggle}
                            tourClickHandler={tourClickHandler}
                        />
                    )
                }
            }
        }
        else{
            return(
                <RoomCard 
                    key={item.id}
                    id={item.id}
                    type={item.type}
                    features={item.features}
                    location={item.location}
                    price={item.price}
                    setDetail={setDetail}
                    detailDisplay={detailDisplay}
                    sideBar={sideBar}
                    setCart={props.setCart}
                    cartItem={props.cartItem}
                    toggle={toggle}
                    tourClickHandler={tourClickHandler}
                />
            )
        }
    })

    return(
        <main className='w-screen h-screen flex flex-col'>
            <div className='flex h-[24%] flex-col items-center w-full shadow-md shadow-lgray'>
                <section className='w-full flex justify-between'>
                    

                    <div className="flex gap-20">
                        <h1 className='text-ggray py-4 text-5xl font-Playfair tracking-wide px-10'>Rentz</h1>

                        <ul className="flex gap-5 items-center">
                            <li><button onClick={() => eventData('filter:Room','room')}
                                        className="border border-black px-4 py-1 rounded-3xl">Rooms</button></li>
                            <li><button onClick={() => eventData('filter:PG','PG')}
                                        className="border border-black px-10 py-1 rounded-3xl">PG</button></li>
                            <li><button onClick={() => eventData('filter:Appartments','Appartments')}
                                        className="border border-black px-4 py-1 rounded-3xl">Appartments</button></li>
                        </ul>
                    </div>
                    

                    <div className="px-10 flex items-center">
                        <CartLogin cartItem={props.cartItem}/>
                    </div>
                </section>

                
                {/* Filter section */}
                <section className='w-full  rounded-b-md flex'>
                    <p className="flex text-ggray w-full px-10 py-3 gap-10">

                        <Link to='/'>
                            <button className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h15" />
                                </svg>
                                    Home
                            </button>
                        </Link>

                       
                        
                        <select onClick={() => eventData('filter:price',filteredOptions.priceF)} onChange={filterChangeHanler} id='priceF'
                                className="ml-36 h-[60%] p-1 border-[1px] border-ggray  outline-none  text-ggray w-[15%] rounded-xl">
                            <option value='select prices' selected disabled hidden>Select prices</option>
                            <option value='All prices'>All prices</option>
                            <option value='4000-5000'>4000 - 5000</option>
                            <option value='5000-6000'>5000 - 6000</option>
                            <option value='7000-8000'>7000 - 8000</option>
                        </select>

                        <select onClick={() => eventData('filter:bhk',filteredOptions.bhkF)} onChange={filterChangeHanler} id='bhkF' 
                                className="h-[60%] p-1 border-[1px] border-ggray  outline-none  text-ggray w-[15%] rounded-xl">
                            <option value='BHK' selected disabled hidden>Select BHk's</option>
                            <option value='All bhk'>All bhk</option>
                            <option value='BHK1'>1 BHk</option>
                            <option value='BHK2'>2 BHk</option>
                            <option value='BHK3'>3 BHk</option>
                        </select>

                        <select className="h-[60%] p-1 border-[1px] border-ggray  outline-none  text-ggray w-[15%] rounded-xl">
                            <option selected disabled hidden>Looking for something more?</option>
                            <option>
                                Extra animeties
                               
                            </option>
                        </select>
                    </p>
                    <h1 className="text-2xl text-lgray tracking-widest py-2">70 Results in <span className="font-bold text-musYellow">Majitar</span></h1>


                </section>
            </div>

                        {/* card section */}
            <div className='h-[76%] w-full flex  gap-1'>
                
                {/* selected card detail on click */}
                <section className={`${detailDisplay ? 'translate-x-0':'-translate-x-96 hidden' }  w-[40%] h-full bg-ggray flex flex-col rounded-t-lg`}>
                        

                        <section className="relative flex h-[55%]">
                                <section className="absolute z-10 bg-transparent w-full h-full">
                                    <div className="w-full  flex justify-end px-1">
                                        <button onClick={()=>setDetail(false)} className="bg-ggray text-musYellow rounded-b-full px-2 py-1">x</button>
                                    </div>

                                    <div className="w-full h-full flex justify-between">
                                        <button className="bg-ggray h-[35%] mt-16 text-lg text-musYellow font-light  px-2 rounded-r-lg">Prev</button>
                                        <button onClick={imgDisplayCounter} className="bg-ggray h-[35%] mt-16 text-lg text-musYellow font-light  px-2 rounded-l-lg">Next</button>
                                    </div>
                                </section>
                            <img src={linkArr[imgNumber]} alt="img" className="relative z-0 w-full"/>
                            
                        </section>

                        <div className="px-4 flex flex-col gap-5">
                            <h1 className="text-musYellow text-2xl tracking-wide font-Roboto py-2 border-b-[4px] border-musYellow">&#8377;{selectedRoom.price}</h1>
                            <ul className="flex gap-5 text-white">
                                <li>Feature 1</li>
                                <li>Feature 2</li>
                                <li>Feature 3</li>
                            </ul>
                            <p className="text-white font-light">Some imformation about the room.........</p>
                            <p className="flex gap-5 text-white">
                                <button className="bg-musYellow px-4 py-3">Book Now</button>
                                <button onClick={tourClickHandler} className="border-[1px] border-musYellow px-4 py-3">Add To Tour</button>
                            </p>
                        </div>
                </section>

                <section className={`${detailDisplay ? 'w-[60%]' : 'w-full'} mt- h-full grid grid-cols-2 gap-2 overflow-y-scroll`}>
                    {showRooms}
                </section>
            </div>
        </main>
    )
}
                  


