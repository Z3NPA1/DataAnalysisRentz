import {useState} from 'react-dom'
import UserProfileCard from './components/userProfileCard'

export default function  OwnerAdmin(){
    return(
        <main className='w-screen h-screen flex'>
            {/* <div className='w-full h-full flex'>
                <div className='w-[30%] h-full'>
                    <h1 className='h-[70%] w-full bg-black rounded-br-[100px]'>

                    </h1>
                </div>

                <div className='w- h-full'>

                </div>
            </div> */}

            <section className='flex flex-col gap-5 w-full px-10 py-5'>


                <nav className='w-full flex justify-between'>
                    <h1 className='font-bold text-4xl text-white bg-gray-800 py-4 px-1 rounded-r-full w-[30%]'>Owner Dashboard</h1>

                    <ul className='flex gap-5'>
                        <li>Home</li>
                        <li>Contact us</li>
                    </ul>
                </nav>

                <section className='h-[20%] flex justify-between'>
                    <UserProfileCard/>

                    <div className='flex flex-col items-end justify-end gap-3 w-[40%] border-b-2 border-gray-700'>
                        <h1 className='font-bold text-4xl text-gray-700'>Building Revenue</h1>
                        <h1 className='font-medium text-2xl text-gray-700'>&#8377;10,000</h1>
                    </div>
                </section>

                <h1 className='text-4xl'><span className='font-bold text-5xl'>Managing</span> Your <span className='font-bold text-5xl'>Building</span> has never been <span className='font-bold text-5xl'>easy</span></h1>
                
                <section className='flex w-full'>
                    
                    <div className='w-[60%]'>

                        <div className='mt-5 w-full h-96 border-2 p-4 rounded-lg shadow-md'>
                            <h1 className='text-2xl font-bold'>Building Overview</h1>
                

                            <section className='mt-5 border-2 p-2 rounded-md'>
                                <h1 className='text-lg text-gray-600 font-medium font-mono'>Room data</h1>

                                <section className='flex flex-col'>


                                    <div className='flex gap-5'>
                                        <div class="w-[60%] h-6 bg-neutral-200 dark:bg-gray-200">
                                            <div class="bg-gray-500 h-6 flex items-center justify-center text-white  p-0.5 text-center text-xs font-bold leading-none" style={{width:'80%'}}>80%</div>
                                        </div>
                                        <h1 className='font-mono text-gray-600'>Rooms filled</h1>
                                    </div>

                                    <ul>
                                        <li className='text-sm mt-2'>Available Room: 0</li>
                                    </ul>
                                </section>


                            </section>
            
                            <p className='mt-20'>
                                <button className='bg-gray-800 text-white p-2 rounded-lg'>Get Tenant List</button>
                            </p>

                        </div>
                    </div>

                    <div className='mt-5 w-[40%] h-96'>
                        

                        <p className='grid grid-cols-2 gap-2  justify-center px-4'>
                            <button className='flex justify-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-white hover:shadow-md  py-2 border-r-2 '>Tenant Query Inbox
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
                                </svg>

                            </button>
                            <button className='flex justify-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-white hover:shadow-md  py-2 '>Adjust room prices
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                        </svg>
                            </button>


                            <button className='flex justify-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-white hover:shadow-md py-2 border-r-2'>Update Building Info
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                            </button>
                            <button className='flex justify-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-white hover:shadow-md py-2 '>Update room vacency
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>

                            </button>
                        </p>

                        <h1 className='w-full mt-20 text-center text-5xl font-serif font-bold drop-shadow-lg'>Rentz</h1>
                    </div>

                </section>
            </section>
        </main>
    )
}