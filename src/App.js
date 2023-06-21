// get all data imports here

import {BrowserRouter,Route,Routes,Outlet} from 'react-router-dom'
import Catalouge from "./components/catalouge";
import ProductPage from "./components/productPage";
import LandingPage from "./landingPage";
 import Login from "./components/login";
 import LoginSignUp from './components/loginPage';
 import { useState } from 'react';
 import ApartmentPage from './components/apartmentPage';
 import AdminHomePage from './admin/adminHomePage';
 import AdminCurd from './admin/adminComponents/adminCurd';
 import AdminAddDataForm from './admin/adminComponents/adminAddDataForm';
 import SignUp from './components/signUp';
 import OwnerAdmin from './ownerAdmin/ownerAdmin';
//  import Admin from './admin/admin';
//  import RegisterOwner from './admin/ownerRegistration';
// import ManageRequests from './admin/manageRequests';
// import OwnerProfile from './admin/ownerAdminProfile';
// import { UnapprovedRooms } from './admin/roomRequests';
//  import SignUp from './components/signUp';
 import SignInTest from './components/loginTest';

export default function App(){

        const [cartItem,setCart] = useState([])

        return(
            <Routes>
                <Route path='/'>
                    <Route path = '/' element = {<LandingPage cartItem={cartItem}/>}/>
                    <Route path='catalouge'>
                        <Route index element={<Catalouge cartItem={cartItem} setCart={setCart}/>}/>
                        <Route path=':id' element = {<ProductPage/>}/>
                    </Route>
                    <Route path='login' element = {<LoginSignUp/>}/>
                   
                    <Route path='Apartment_Registration' element={<ApartmentPage/>}/>
                    <Route path='Admin'>
                        <Route index element={<AdminHomePage/>}/>
                        <Route path='CURD' element={<AdminCurd/>}/>
                        <Route path='AdminAddData' element={<AdminAddDataForm/>}/>
                    </Route>
                    <Route path='LoginI' element={<Login/>} />
                    <Route path='signUp' element = {<SignUp/>}/>
                </Route>
                <Route path='ownerAdmin' element = {<OwnerAdmin/>}/>
            </Routes>
            
        )
}