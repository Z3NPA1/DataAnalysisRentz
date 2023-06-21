import { useState } from "react";
import { signInUserwithEmailAndPassword  } from "../utils/firebase";

const SignInTest = () => {
    const defaultFormFields = {
        displayName:'',
        email: '',
        password: '',
        address: ''

    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const{displayName, email, password, address} = formFields;

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]:value});
        console.log(formFields);
    }
    const callSignInFunction = async (e) => {
        e.preventDefault();
        const currentUsers = await signInUserwithEmailAndPassword (email, password);
        console.log(currentUsers);
    }

    
    return(
        <div>
            <form>
                <h2> your Email: </h2>
                <input placeholder="your email" type='email' value={email} name="email" onChange={onChangeHandler} />
                <h2> your Password : </h2>
                <input placeholder="password" type='password' value={password} name="password" onChange={onChangeHandler} />
                <h2> Your Display Name: </h2>
               
                <button onClick={callSignInFunction}> SignUp </button>
            </form>
            
        </div>
    )
}
export default SignInTest;