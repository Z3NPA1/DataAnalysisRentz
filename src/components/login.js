import React,{useState} from 'react'
import { signInAuthUserWithEmailAndPassword } from '../utils/firebase'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const defaultFormFields = {
        email: '',
        password:'',
    };
    const nav = useNavigate()
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const { setCurrentUser } = useContext(UserContext);

    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          const { user } = await signInAuthUserWithEmailAndPassword(email, password);
          setCurrentUser(user);
         
          
          resetFormFields();
        } catch (error) {
          console.log('user sign in failed', error);
        }
      };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }


   

    

    return(
        <div className = "flex justify-center items-center w-screen h-screen overflow-auto bg-dblue" >
            <div className="md:mx-6 md:p-10 bg-cream text-dblue">
                <div className="text-center">
                <img
                    className="mx-auto w-48"
                    src={require('../images/logo.png')}
                    alt="logo" />
                </div>
                
                {/* Form data */}
                <form onSubmit={handleSubmit}>
                    <p className="mb-4">Please login to your account</p>
                    <div className="relative mb-4" data-te-input-wrapper-init>
                        
                        <input
                            type="text"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-red [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder="Username" 
                        />
                        
                        <label
                            htmlFor="serName"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                        >
                            email
                        </label>
                    </div>


                    <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                            type="password"
                            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            name="password"
                            value={formFields.password}
                            onChange={handleChange}
                            placeholder="Password" 
                        />
                        <label
                            htmlFor="password"
                            className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                        >
                            Password
                        </label>
                    </div>

                    <div className="mb-12 pt-1 pb-1 text-center">
                        
                        <button
                            className="mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-dblue"
                        >
                            Log in
                        </button>
                        <a href="#!">Forgot password?</a>
                    </div>

                    <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                        >
                            Register
                        </button>
                        <h2> Dont have an account???</h2>
                        <button onClick={() => nav('./signUp')}> Sign Up</button>
                    </div>
                </form>

            </div>
            </div>
    )
}