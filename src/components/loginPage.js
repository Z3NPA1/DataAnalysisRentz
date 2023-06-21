import React,{useState} from 'react'
import { signInAuthUserWithEmailAndPassword } from '../utils/firebase'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { useNavigate } from 'react-router-dom'

export default function LoginSignUp(){


     
        const nav = useNavigate()
        
       
    
       
    
        
    
       
    
        

    const [toggle,setToggle] = useState(false)
    const [formID,setID] = useState('null')
    
    const clickHandler = (string) =>{
        setID(string)
        setToggle(prev => !prev)
    }

    const LoginForm = ({id}) =>{
        const defaultFormFields = {
            email: '',
            password:'',
        };
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
          
            setFormFields((prevFormFields) => ({
              ...prevFormFields,
              [name]: value,
            }));


       


          
        
            
         
        
          
            console.log(formFields);
          };
    
    
        return(
            <form className="flex flex-col gap-5">

                <h1>{id === 'Normal' ?'Normal' : 'Owner' }</h1>
                <input onChange={handleChange} value={email} type='email' name='email' placeholder="your email Id here" className="bg-lgray p-3 rounded-full"/>
                <input onChange={handleChange} value={password} type='password' name='password' placeholder="Passowrd" className="bg-lgray p-3 rounded-full"/>
                <button onClick={handleSubmit} className="bg-goodGreen text-white py-2 w-1/2 rounded-md">LogIn</button>
            </form>
        )
    }

    return(
        <main class="flex justify-center items-center w-screen h-screen">

            <nav className='absolute top-0 flex w-full justify-between px-20 py-4 shadow-md bg-white z-10 text-lg'> 
                <h1>Home</h1>
                <ul className='flex gap-5 font-light'>
                    <li>Contact Us</li>
                    <li>Services</li>

                    {/* <Link to='login'>
                        <li>Login/SignUp</li>
                    </Link> */}
                </ul>
            </nav>
            

            <div className="w-1/2 h-full flex flex-col justify-center items-center">
                <h1 className="relative font-Playfair text-[200px] tracking-wider py-10 px-5 text-gray-100 drop-shadow-lg">Rentz</h1>
                <p className="text-lg font-bold text-gray-400 drop-shadow-lg">Some Content to Write</p>
            </div>


            <div className="w-1/2 h-[80%] mt-10 bg-dblue flex justify-center items-center shadow-md shadow-black">
                <p className={`${toggle ? 'hidden' :''} flex flex-col justify-center items-center gap-5`}>
                    <button onClick={()=>clickHandler('Normal')} className="py-4 px-6 rounded-full border border-goodGreen text-goodGreen">Log in for Normal Users</button>
                    <button onClick={()=>clickHandler('Owner')} className="p-4 rounded-full bg-goodGreen text-white">Log in for Building Owners</button>

                    <span className="border bordera-white w-full h-[5%]"></span>

                    <button onClick={() => nav('/signUp')} className="py-3 px-20 rounded-full bg-goodGreen text-white">SignUp</button>
                </p>
                
             
                <div className={`${toggle ? '' :'hidden'} flex flex-col gap-5`}>
                    <LoginForm id={formID}/>
                    <button onClick={() => setToggle(false) } className="bg-black text-white py-2">Back</button>
                </div>
            </div>
        </main>
    )
}




