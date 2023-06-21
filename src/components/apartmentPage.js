import { useState } from "react"
import { Link } from "react-router-dom"
import { sumbitApartmetRequest, addRequestDocumentToStorage } from "../utils/firebase"

export default function ApartmentPage(){
    const defaultFormFields = {
        fullName: "",
        emailId: "",
        location:"",
        phoneNumber:"",
        adharDoc: [],
        houseDoc: [],
        houseId: ''
    }

    const [formToggle,setFormtoggle] = useState(false)

    const [formSlider,setFormSlider] = useState(false)

    const [formData ,setFormData] = useState(defaultFormFields)

    const handleFormSubmit = async(e) => {
        e.preventDefault()
       const formDataSecond = await addRequestDocumentToStorage(formData);
       setFormData(prev =>({
        ...formDataSecond
       }))
       console.log(formData);

         await sumbitApartmetRequest(formData);
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
        // console.log(formData)
    }

    const handleImageChange = (e) => {
        
        const {name, files} = e.target;
        // console.log(files);
        const imageArray = Array.from(files);
        console.log('imageArray',imageArray)
        setFormData({...formData, [name]:imageArray});
        // console.log(formData);
    }


    
    



    return(
        <main className="w-screen flex flex-col">

            <nav className='fixed flex w-full justify-between px-20 py-4 shadow-md bg-white z-10 text-lg'> 
                <h1>Home</h1>
                <ul className='flex gap-5 font-light'>
                    <li>Contact Us</li>
                    <li>Services</li>

                    <Link to='login'>
                        <li>Login/SignUp</li>
                    </Link>
                </ul>
            </nav>

            <section className="w-full h-screen flex px-20">

                <div className={`${formToggle ?'hidden':'w-1/2 h-full'}`}>
                    <h1 className="mt-36 text-9xl font-bold">Rest Easy</h1>
                    <h2 className="mt-8 text-4xl px-2">We'll do all the work for you</h2>
                    <h1 className="text-2xl px-2">Managing your building has never been easier</h1>
                </div>

                <div className={`${formToggle ?'w-1/2 h-full': 'hidden'}`}>

                    <h1 className="mt-40 text-7xl">Welcome Onboard!</h1>
                    


                    <form className="mt-20 flex flex-col gap-5">

                        <div className={`${formSlider ? 'hidden' : 'flex flex-col gap-5 border-2 border-black p-3 rounded-lg'}`}>
                            <p className="flex gap-8 items-center">
                            <label className="font-medium text-lg">Name</label>
                            <input  className="p-1 outline-none border-b border-ggray"
                                        type='text' placeholder="Owners's Name " name='fullName' value={formData.fullName} onChange={handleChange}/>
                                        </p>

                            <p className="flex gap-9 items-center">
                                <label className="font-medium text-lg">Email</label>
                                <input className="p-1 outline-none border-b border-ggray"
                                type='text' placeholder="Enter your Email" name="emailId" value={formData.emailId} onChange={handleChange}/>
                                </p >
                                
                                <p className="flex gap-4 items-center">
                                <label className="font-medium text-lg">Location</label>
                                <input className="p-1 outline-none border-b border-ggray"
                                type='text' placeholder="Buildings Location" name="location" value={formData.location} onChange={handleChange}/>
                                </p >
                                
                                <p className="flex gap-3 items-center">
                                <label className="font-medium text-lg">Number</label>
                                <input className="p-1 outline-none border-b border-ggray"
                                type='text' placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                            </p>

                        </div>

                        <div className={`${formSlider ? 'flex flex-col gap-5' : 'hidden'}`}>

                            <p className="flex flex-col gap-5 border-2 border-black p-3 rounded-lg">
                                <label className="text-lg font-bold text-lgray2">Please provide your Adhar Card</label>
                                <input type='file' accept="images/*" multiple onChange={handleImageChange} name="adharDoc" />
                            </p>

                            <p className="flex flex-col gap-5 border-2 border-black p-3 rounded-lg">
                                <label className="text-lg font-bold text-lgray2">Please provide your house document</label>
                                <input type='file' accept="images/*" multiple onChange={handleImageChange} name="houseDoc" />
                            </p>

                        </div>

                        <p  onClick={() => setFormSlider(prev => !prev)}
                                 className="bg-black text-white w-1/2 py-2 rounded-lg text-center">{formSlider ? 'Back' : 'Next'}</p>

                        {formSlider ?  <button  onClick={handleFormSubmit}
                                                className="w-1/2 border-black border-2 py-2 rounded-lg text-center">
                                                Submit
                                        </button> : ''}

                    </form>
                    </div>

                <div className="relative w-1/2 h-full flex flex-col items-center justify-center">

                    <section className="w-full flex justify-end">
                        <button onClick={() => setFormtoggle(prev => !prev)} className="bg-goodGreen text-white px-20 py-5 font-medium">{formToggle ? 'wlecome':'Fill up Registration Form'}</button>
                    </section>
                    <h1 className="absolute bottom-0 w-full text-right font-Playfair text-9xl tracking-wider py-10 px-5 text-ggray drop-shadow-lg ">Rentz</h1>

                </div>
            </section>

        </main>
    )
}