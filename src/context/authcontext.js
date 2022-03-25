import React,{useState,useEffect,createContext} from 'react';
import { loggedInUser } from '../service/useraxios';
import { checkAppointment } from '../service/appointaxios';
import {useNavigate} from "react-router-dom";

const AuthContext=createContext();


const AuthContextProvider = (props) => {

    const navigate=useNavigate();

    const [loggedIn,setLoggedIn]=useState(() => {
        const stickyValue = window.localStorage.getItem("loggedInValue");
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : undefined;
      });


    const [checkAdmin,setCheckAdmin]=useState(() => {
        const stickyValue = window.localStorage.getItem("adminValue");
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : false;
      });

    const [useremail,setUseremail]=useState(() => {
        const stickyValue = window.localStorage.getItem("emailValue");
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : "";
      });

    const [username,setUsername]=useState(() => {
        const stickyValue = window.localStorage.getItem("nameValue");
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : "";
      });

    const [checkAppoint,setCheckAppoint]=useState(() => {
        const stickyValue = window.localStorage.getItem("appointValue");
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : false;
      });





    const getLoggedIn=async()=>{
        const loggedInRes=await loggedInUser();

        setLoggedIn(loggedInRes.data);
        
    }

    const checkApp=async(data)=>{
        const checkRes=await checkAppointment(data);
        setCheckAppoint(checkRes.data);
        if(checkRes.data){
            navigate("/reciept");

            }else{
                navigate("/addAppointment");
              
            }
    }


    const getAdmin=async(data)=>{
        setCheckAdmin(data);
        console.log("this is check admin ",data);
    }


    const getEmail=async(data)=>{
        setUseremail(data);
    }

    const getName=async(data)=>{
        setUsername(data);
    }



  


    useEffect(()=>{
        getLoggedIn();
        localStorage.setItem("loggedInValue",JSON.stringify(loggedIn));
        localStorage.setItem("adminValue",JSON.stringify(checkAdmin));
        localStorage.setItem("appointValue",JSON.stringify(checkAppoint));
        localStorage.setItem("nameValue",JSON.stringify(username));
        localStorage.setItem("emailValue",JSON.stringify(useremail));



    },[loggedIn,checkAdmin,checkAppoint,username,useremail])

    return (
       <AuthContext.Provider value={{loggedIn,checkAdmin,useremail,checkAppoint,username,getLoggedIn,getAdmin,getEmail,getName,checkApp}}>
           {props.children}
       </AuthContext.Provider>
    )
}


export default AuthContext;
export {AuthContextProvider};
