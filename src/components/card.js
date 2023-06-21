import React,{useState} from "react";
import {Link} from 'react-router-dom'


const StarRating = () => {
    const [rating, setRating] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              onClick={() => setRating(index)}
            >
              <span className={index <= rating ? "text-musYellow" : "text-gray-100"}>&#9733;</span>
            </button>
          );
        })}
      </div>
    )
}

export default function RoomCard(props){


    const [liked,setLiked] = useState(false)
        

       

        return(
            
            <div 
                 className={`${props.detailDisplay? 'h-[450px] flex-col':'h-[280px]'} mt-5 px-5 group col-span-1 row-span-1 h-[280px] flex  border-gray-300 rounded-md transition-all duration-100 ease-in  hover:shadow-md hover:shadow-gray-300 hover:border-gray-200`}>
                
                <Link to={props.id} className="w-[50%]">
                  <section className={`flex  p-5`}>
                      <img src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1669799.jpg&fm=jpg" alt="img" className=""/>
                  </section>
                </Link>

                <section className={`${props.detailDisplay ? 'w-[100%] h-[30%] text-sm' : 'w-[50%] py-5'} flex flex-col  w-[50%] px-4`}>

                    <div className="w-full h-full  px-5 flex flex-col justify-center rounded-lg ">

                        <Link to={props.id}>
                          <h3 className={`${props.detailDisplay ? 'text-lg':'text-2xl' }  font-bold text-ggray font-Roboto`}>&#8377;{props.price}/mo</h3>
                          {/* <!-- Specifications and book now--> */}
                        
                          <div    onClick={()=>props.toggle(props.id,props.price)}
                                  className="flex justify between w-[100%] mt-3">
                              <div className="grid grid-cols-2 grid-rows-2 text-musYellow gap-2 w-[75%] font-light text-sm">
                                  <span>{props.type}</span>
                                  <span>1 Bath</span>
                      
                                  <span className="flex">24hr
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                      </svg>
                                  </span>
                                  <span>{props.features.wifi?'Free Wifi':'FILL'}</span>

                              </div>
                      
                          </div>
                        </Link>

                        <StarRating />

                        <p className={`${props.detailDisplay ? 'hidden bg-red-400' : 'mt-10'} flex gap-5 w-full mt-10 items-center`}>
                            <button className='bg-goodGreen text-white px-4 py-4 text-sm'>Book Now</button>
                            <button onClick={props.tourClickHandler} className="border-[1px] border-goodGreen p-4 text-goodGreen text-sm">Add To Tour</button>

                            <svg onClick={() => setLiked(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill={`${liked ? 'red' :'none'}`} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>


                        </p>

                    </div>
                </section>
            </div>


    )
}