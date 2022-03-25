import React,{useContext} from 'react';
import {NavLink,useNavigate} from "react-router-dom";
import { logoutUser } from '../service/useraxios';
import AuthContext from "../context/authcontext";




const Navbar = () => {

    const navigate=useNavigate();

    const {getLoggedIn,loggedIn,checkAdmin,checkAppoint}=useContext(AuthContext);

    const handleLogout=async()=>{
        await logoutUser();
        await getLoggedIn();
        navigate("/");
    }


    return (
        <>
<div className="navbar">
{
    loggedIn && checkAdmin?(
        <>
        <NavLink to="/viewAppointment" activeClassName="active"><i class="fas fa-list"></i></NavLink>
        <button className='logoutBtn' onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></button>

        </>

    ):loggedIn?(
        <>{
            checkAppoint?(<>
 
 <NavLink to="/reciept" activeClassName="active"><i class="fas fa-file-invoice"></i></NavLink>

 <button className='logoutBtn' onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></button>
            </>):(<>

 <NavLink exact to="/addAppointment" activeClassName="active"><i class="far fa-address-card"></i></NavLink>

 <button className='logoutBtn' onClick={handleLogout}><i class="fas fa-sign-out-alt"></i></button>

            </>)
        }
       
        </>
    ):(
        <>
        <NavLink exact to="/" activeClassName="active"><i class="fas fa-user"></i></NavLink>
  
        </>
    )
}
  



</div>   
        </>
    )
}

export default Navbar;
