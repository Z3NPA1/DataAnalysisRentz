import React,{useState} from "react";
import data from "../data";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";


export default function ProductPage(){
    const {id} = useParams()
    const [rooms,setRooms] = useState(data)

    const [BigImage,setImage] = useState("https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1669799.jpg&fm=jpg")
    
    const viewRoom = rooms.filter(item =>{
        if(item.id === id) return item
    })

    const ImageBox = ["https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1669799.jpg&fm=jpg","https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYK0nz46fEm_QEWkswFDhnxMtOU0RqeVqKt7UK6BybDNYAupHIovZv1DMfxi0lJxZWjN8&usqp=CAU"]
    
    const ReviewBox = [ 
                        {userName: 'Ritesh',
                        postedReview: 'Very good',},
                        
                        {userName: 'Utsav',
                        postedReview:'excellent and spacious',},
 
                        
                        {userName: 'Nischal',
                        postedReview:'was great',},

                        {userName: 'Ritesh',
                        postedReview: 'Very good', },
                        
                      
                        {userName: 'Ritesh',
                        postedReview: 'Very good',},
                        
                        {userName: 'Utsav',
                        postedReview:'excellent and spacious',},
 
                        
                        {userName: 'Nischal',
                        postedReview:'was great',},

                        {userName: 'Ritesh',
                        postedReview: 'Very good', },
                        {userName: 'Ritesh',
                        postedReview: 'Very good',},
                        
                        {userName: 'Utsav',
                        postedReview:'excellent and spacious',},
 
                        
                        {userName: 'Nischal',
                        postedReview:'was great',},

                        {userName: 'Ritesh',
                        postedReview: 'Very good', },
    ]

    

    let pr = '2222'
    return(
        <div class="flex flex-col w-screen">
            <NavBar/>

            <section className="w-full h-[80%] flex">
                <div className="w-1/2 py-10 h-full flex flex-col items-center justify-center pl-40 gap-2">
                    <img src={BigImage} alt="img" className="mt-24"/>

                    <p className="flex gap-5 h-10 w-10 justify-center">
                        {ImageBox.map(item =>{
                            return <img src={item} onClick={() => setImage(item)}/>
                        })}
                    </p>
                </div>

                <div className="w-1/2 h-full px-10 py-10 flex flex-col gap-5 border-b-8 border-ggray">
                    <h1 className="mt-24 text-4xl font-Roboto text-ggray">&#8377;{viewRoom[0].price}</h1>

                    <h1>2 Bedrooms 1 Kitchen</h1>

                    <ul className="flex flex-col gap-2 font-Roboto text-lgray2">
                        <li>{viewRoom[0].features.wifi ? <h1 className="flex items-center gap-2 w-1/4  border border-ggray rounded-3xl py-1 px-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>wifi</h1>
                                                        : ''}
                        </li>

                        <li>{viewRoom[0].features.balcony ? <h1 className="flex items-center gap-2 w-1/4  border border-ggray rounded-3xl py-1 px-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>balcony</h1>
                                                            : ''}
                        </li>

                        <li>{viewRoom[0].features.gyeser ? <h1 className="flex items-center gap-2 w-1/4  border border-ggray rounded-3xl py-1 px-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>gyeser</h1>
                                                            : ''}
                        </li>

                        <li>{viewRoom[0].features.inverter ? <h1 className="flex items-center gap-2 w-1/4  border border-ggray rounded-3xl py-1 px-2 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                            </svg>inverter</h1>
                                                            : ''}
                        </li>
                    </ul>
                        
                    <p className="text-lgray2">
                        Discover our exceptional rental rooms, now available on our exclusive website! Experience seamless connectivity with free high-speed WiFi and indulge in a revitalizing shower with our state-of-the-art geysers. With cozy beds, modern furnishings, and a dedicated team, your comfort is our top priority. Whether it's for business or leisure, our rental rooms provide the perfect blend of convenience and luxury. Book now and elevate your stay to new heights!
                    </p>
                    
                    <p className="flex gap-5">
                        <button className='bg-goodGreen text-white px-4 py-4 text-sm'>Book Now</button>
                        <button className="border-[1px] border-goodGreen p-4 text-goodGreen text-sm">Add To Tour</button>
                    </p>
                </div>
            </section>

            <section className=" flex flex-col w-full px-40 py-20">

                        <h1 className="font-Roboto text-5xl text-lgray2">Review's</h1>

                        <section className="flex mt-10">
                            <div className="w-[60%] h-96 rounded-md bg-white overflow-scroll">
                                {
                                    ReviewBox.map(item => {
                                        return (<section className="flex flex-col gap-3 border-b py-8">
                                                    <h1 className="text-lgray2 text-xl flex gap-2 items-center">{item.userName}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-6">
                                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                                                                        </svg>
                                                    </h1>
                                                    <p className="font-light tracking-wide">{item.postedReview}</p>
                                                </section>)
                                    })
                                }
                            </div>

                            <div className="w-[40%] h-full px-5">
                                <h1 className="font-Roboto text-3xl"> Overall Ratings</h1>
                                <ul className="flex flex-col gap-2 mt-5 py-4 border-b border-ggray">
                                    <li className="flex gap-2"><span className="text-musYellow">&#9733;&#9733;&#9733;&#9733;</span> <h1 className="font-light">Water Availablity</h1></li>
                                    <li className="flex gap-2"><span className="text-musYellow">&#9733;&#9733;&#9733;&#9733;</span> <h1 className="font-light">Electricity Availablity</h1></li>
                                    <li className="flex gap-2"><span className="text-musYellow">&#9733;&#9733;&#9733;&#9733;</span> <h1 className="font-light">Hygine</h1></li>
                                </ul>
                            </div>
                        </section>

            </section>

       </div>

    )
}