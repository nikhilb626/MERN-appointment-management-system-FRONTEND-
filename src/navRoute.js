import React,{useContext} from 'react';
import AddAppointment from './components/addAppointment';
import Register from './components/register';
import ViewAppointment from './components/viewAppointment';
import {Routes,Route} from "react-router-dom";
import Reciept from './components/reciept';
import AuthContext from "./context/authcontext";
import UpdatePage from "./components/updatePage";

const NavRoute = () => {

    const {loggedIn,checkAdmin,checkAppoint}=useContext(AuthContext);

    return (
        <>
        <Routes>
        {
            loggedIn && checkAdmin?(
                <>
                <Route path="/viewAppointment" element={<ViewAppointment />} />
                <Route exact path="/update/:id/:date/:slot" element={<UpdatePage />} />
                </>
            ):loggedIn?(
                <>
                {
                    checkAppoint?(<>
<Route path="/reciept" element={<Reciept/>} />

                    </>):(
                        <>
                        <Route path="/addappointment" element={<AddAppointment />} />

                        </>
                    )
                }

        

                </>
            ):(
                <>

                <Route exact path="/" element={<Register />} />
                </>
            )
        }


         
        </Routes>
            
        </>
    )
}

export default NavRoute;
