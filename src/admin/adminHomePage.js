import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { acceptApartmentRequests, fetchApartmentRequests } from '../utils/firebase';


export default function AdminHomePage() {

    const [databaseSubMenu,setDatabaseSubMenu] = useState(false)
    const [requestListViewToggle, setRequestListViewToggle] = useState(false)
    const [requestList,setRequestList] = useState([])
    const [requestData,setRequestData] = useState(null)
    const [houseId, sethouseId] = useState({houseId: ''});


    const viewApartmentRequest = async () =>{

        setRequestListViewToggle(prev => !prev)
        const allRequest = await fetchApartmentRequests()
       
        console.log(allRequest)
        setRequestList([...allRequest])
    }

//function to view the room Documents


    const callAcceptRequest = (data,houseID)=> {
        console.log('accept request', data);
        acceptApartmentRequests(data,houseID)
    }

    const onChangeHandler = (e) => {
        const {name, value } = e.target;
        sethouseId({...houseId, [name]:value});
        console.log(houseId);
    }
    const [houseID,setHouseId] = useState(null)

    console.log(requestData)
    const requestDisplay = requestList.map(item =>{
        return <section onClick={() => setRequestData({...item})} className='text-lg font-bold py-2 px-1 border-[1px] border-black rounded-lg'>
                    <h1>{requestList.indexOf(item) + 1} {item.emailId}</h1>
                </section>
   })

    return (
        <main className='flex flex-col w-screen h-screen justify-center items-center'>

            <section className='w-1/2 '>
                <p className='flex bg-slate-200 w-full p-3 rounded-3xl'>
                    <input type='search' className='bg-transparent w-full'/>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </p>
            </section>

            <h1 className="relative font-Playfair text-9xl tracking-wider py-10 px-5 text-ggray drop-shadow-lg">Rentz</h1>
            
            <section className='flex flex-col gap-5 w-full justify-center items-center'>
                
            
                <p className={`${databaseSubMenu || requestListViewToggle ? 'hidden' : 'flex gap-5 w-full justify-center'}`}>
                    <button onClick={viewApartmentRequest}
                            className='bg-black text-white w-[22%] py-5 rounded-lg'>
                            Apartment Registration Request
                    </button>

                    <button onClick={() => setDatabaseSubMenu(prev => !prev)}
                            className='bg-black text-white w-[20%] py-5 rounded-lg'>
                            Database Options
                    </button>
                </p>

                <div className={`${databaseSubMenu ? 'flex flex-col gap-5 w-full items-center' : 'hidden'}`}>
                    
                    <p className='flex gap-5 w-[44%]'>
                        <button className='bg-black text-white w-[50%] py-5 rounded-lg'>Apartments data</button>
                        <button className='bg-black text-white w-[50%] py-5 rounded-lg'>User data</button>
                    </p>

                    <div className='flex gap-5 w-[44%]'>

                        <div className='group transition ease-in duration-700 relative bg-black text-white w-[50%] py-5 rounded-lg'>
                            
                            <Link to='CURD'>
                                <button className='w-full h-full'>C.U.R.D</button>
                            </Link>
                            
                        </div>
                        
                        <button onClick={() => setDatabaseSubMenu(prev => !prev)} className='border-2 border-black text-black w-[50%] py-5 rounded-lg'>Back</button>
                    </div>
                </div>

                <div className={`${requestListViewToggle ? 'relative flex flex-col w-[70%] h-[600px] border-2 border-black p-2 rounded-md ':'hidden' }`}>

                    <div className='relative w-full h-full border-[1px] border-black rounded-md'>
                        <button onClick={() => setRequestListViewToggle(prev => !prev)} className='absolute border-2 bg-stone-600 text-white
                        w-[10%] py-3 rounded-3xl'>
                            Back
                        </button>

                        <div className='mt-16 px-2 flex flex-col gap-5'>
                            {requestDisplay}
                        </div>

                        {   requestData == null ? '':
                            <div className={`absolute top-0 w-full h-full bg-white rounded-md p-2`}>
                                <h1 onClick={() => setRequestData(null)} className='absolute right-0 mr-5 bg-gray-600 rounded-full w-10 h-10 text-center py-2 text-white font-bold'>X</h1>

                                <section className='flex flex-col gap-3 h-full'>
                                    <h1 className='text-lg font-bold'>Name:<span>{requestData.fullName}</span></h1>
                                    <h1 className='text-lg font-bold'>Email:<span>{requestData.emailId}</span></h1>
                                    <h1 className='text-lg font-bold'>Phone Number:<span>{requestData.emailId}</span></h1>
                                
                                    <div className='w-full h-[30%]'>
                                        <h1 className='text-lg font-bold'>User Adhar Document</h1>
                                        <p className='w-[50%] h-full flex'>
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rentz-555.appspot.com/o/requestsDocuments%2Fman%40gg.com?alt=media&token=ef37a2dc-abd3-45eb-8bf6-2042c31624ab' alt=''/>
                                        </p>
                                    </div>

                                    <div className='w-full h-[30%]'>
                                        <h1 className='text-lg font-bold'>User House Document</h1>
                                        <img src='https://firebasestorage.googleapis.com/v0/b/rentz-555.appspot.com/o/requestsDocuments%2Fman%40gg.com?alt=media&token=ef37a2dc-abd3-45eb-8bf6-2042c31624ab' alt=''/>
                                    </div>

                                    <p>
                                        <input type='text' placeholder='Give an House ID' name='houseID' value={houseID} onChange={(e) => setHouseId(e.target.value)} className='border-[1px] border-black rounded-md p-2'/>
                                    </p>

                                    <div className='flex gap-5'>
                                        <button onClick={()=>callAcceptRequest(requestData,houseId)} className='bg-black text-white p-2 rounded-3xl'>Approve User Form</button>
                                        <button className='border-black border-[1px] p-3 rounded-3xl'>Reject Form</button>
                                    </div>
                                  
                                </section>

                            </div> 
                            
                        }

                    </div>
                </div> 




                <button className='border-2 border-black text-black w-[44%] py-5 rounded-lg'>Go to Dashboard</button>
            </section>
                

        </main>
    );
}

