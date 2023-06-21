import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../utils/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const SignUp = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const navigate = useNavigate()
  

  

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const onChangeHandler = (event) => {
  

    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) return;
    try{
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        
        await sendEmailVerification(user);
        alert("check your email for the verification link we have sent you");
        resetFormFields();
        navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };


  
    return(

        <div className=" flex items-center justify-center w-screen h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black 
        md:bg-gradient-to-r from-gray-700 via-gray-900 to-black flex flex-col md:flex md:flex-row items-center">

        <div class="flex justify-center py-2 px-10 w-screen">
             <img src="logo1.png" alt="" />
        </div>
        <div class="w-4/5 h-3/5 md:h-4/5  flex flex-col items-center  py-5">
            <div class="text-[rgba(255,255,255,0.65)] text-xl font-extrabold">Sign Up</div>
    
            <form onSubmit={handleSubmit}>
            <div class="flex flex-col mt-10 w-[100%] items-center py-5 space-y-5">
                
                <input type="text" 
                name="displayName" 
                placeholder="displayName"
                onChange={onChangeHandler} 
                value={displayName}
                required
                class=" text-white border-b-2 border-b-white bg-transparent w-3/5" />
                
                <input type="email" 
                name="email" 
                placeholder="email" 
                onChange={onChangeHandler}
                value={email}
                required
                class="text-white border-b-white bg-transparent w-3/5" />

                <input type="password"
                name="password" 
                placeholder="Enter Password" 
                onChange={onChangeHandler}
                value={password}
                required
                class="text-white border-b-2 border-b-white bg-transparent w-3/5" />


                <input type="password" 
                name="confirmPassword" 
                placeholder="confirmPassword" 
                onChange={onChangeHandler}
                value={confirmPassword}
                required
                class="text-white border-b-2 border-b-white bg-transparent w-3/5" />



            </div>

            <div class=" flex wrapper items-start w-3/5">
                 <button class="bg-white hover:bg-[rgba(255,255,255,0.65)] rounded-full w-full px-1 py-1">SignUp</button>
            </div>

                </form>

                
           
            <div class="flex w-full mt-16 h-1/5 ">
                <div class="w-1/2 h-full flex flex-col justify-center text-white md:block md:text-center">
                    <a href="#" class="hover:text-red-600">Forgot Password?</a>
                </div>
               
            </div>
    
        </div>
        </div>
   
    );
}
export default SignUp;