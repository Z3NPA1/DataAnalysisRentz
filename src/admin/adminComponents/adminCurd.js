import React,{useState} from 'react';
import AdminAddDataForm from './adminAddDataForm';


function AdminCurd() {

    const [addDataToggle,setAddDataToggle] = useState(false)
    const [updateDataToggle,setUpdateDataToggle] = useState(false) 

    const FullDataBase = () =>{
        return(
            <h1>show database</h1>
        )
    }


    return (
        <main className='flex w-screen h-screen flex-col gap-2 p-2 px-5'>
            <h1 className="relative font-Playfair text-6xl tracking-wider text-ggray drop-shadow-lg">Rentz</h1>
            <h1 className="relative font-bold text-4xl tracking-wider text-ggray drop-shadow-lg">Database</h1>

            <div className='w-full h-[90%] rounded-lg'>
                <ul className='flex gap-5 mt-5'>
                    <li onClick={() => setAddDataToggle(prev => !prev)} className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                       </svg>
                  
                        Add data
                    </li>

                    <li onClick={() => setUpdateDataToggle(prev => !prev)} className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                  
                        Update data
                    </li>
                </ul>

                
                <section className='w-full h-[90%]'>

                    { 
                        addDataToggle ? <AdminAddDataForm /> :
                        updateDataToggle ? 'update data' : <FullDataBase />

                    }

                </section>
            </div>
        </main>

    );
}

export default AdminCurd;