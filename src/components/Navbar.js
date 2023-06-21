import {Link, useNavigate, Outlet} from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import { signOutUser } from '../utils/firebase';



export default function NavBar(){
   
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log('currentSignedInUserIs', currentUser);
    const nav = useNavigate();
    const logOut = () => {
       signOutUser();
       setCurrentUser(null);
    }
    return(
        <nav className='fixed flex w-full justify-between px-20 py-4 shadow-md bg-white z-10 text-lg'> 
                <Link to='/'>
                    <h1 className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                    Home
                    </h1>
                </Link>

                <ul className='flex gap-5 font-light'>
                    <li>Contact Us</li>
                    <li>Services</li>
                    {currentUser ? (
                        <li className='cursor-pointer' as='span' onClick={logOut}>
                         current user email is : {currentUser.email} SIGN OUT
                        </li>
                      ) : (
                        <li onClick={()=>nav('/login')}>SIGN IN</li>
                      )}
                </ul>
            </nav>
    )
}