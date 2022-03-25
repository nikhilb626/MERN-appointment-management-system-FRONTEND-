import React,{useState,useContext} from 'react';
import { addUser,loginUser } from '../service/useraxios';
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/authcontext";



const Register = () => {

    const navigate=useNavigate();

    const {getLoggedIn,getAdmin,getEmail,getName,checkApp}=useContext(AuthContext);


    const [form1,setForm1]=useState("form");

    const [form2,setForm2]=useState("form hide");

    const [regname,setRegname]=useState("");
    const [regemail,setRegemail]=useState("");
    const [regpassword,setRegpassword]=useState("");
    const [regcpassword,setRegcpassword]=useState("");


    const [email,setLogemail]=useState("");
    const [password,setLogpassword]=useState("");


    const [error,setError]=useState("");
    
    const [success,setSuccess]=useState("successCont");









    const showSignUp=()=>{
        setForm1("form hide");
        setForm2("form");
        setLogemail("");
        setLogpassword("");
        setError("");
    }

    const showLogin=()=>{
        setForm1("form");
        setForm2("form hide");
        setRegname("");
        setRegemail("");
        setRegpassword("");
        setRegcpassword("");
        setError("");
    }



    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            if(regname==="" || regemail==="" || regpassword==="" || regcpassword===""){
                setError("please fill the form properly");
            }
    
            else if(regname!=="" && regemail!=="" && regpassword!=="" && regcpassword!==""){
                if(regpassword===regcpassword){
                    const registerObj={
                        name:regname,email:regemail,
                        password:regpassword
                    }

                    // console.log(registerObj);
                    await addUser(registerObj);
                   setError(""); 
                    setRegname("");
                    setRegemail("");
                    setRegpassword("");
                    setRegcpassword("");
                    setForm1("form");
                    setForm2("form hide");
                  setSuccess("successCont show");

                    
                    

                }                          
                else{
                    setError("confirm password does not match");
                    // console.log("confirm password does not match");
                }
            }
    
        }catch(err){
             console.log(err);
             setError(err.response.data.errorMessage);
        }
        
    }



    const handleLog=async(e)=>{
        e.preventDefault();
        try{
            if(email==="" || password===""){
                setError("please fill the form properly");
                // console.log("please fill the form properly")
            }
            else if(email!=="" && password!==""){
                const logObj={
                    email,password
                }

                const userDetail=await loginUser(logObj);
                getAdmin(userDetail.data.isAdmin);
                getEmail(userDetail.data.email);
                getName(userDetail.data.name);

                await getLoggedIn();
                setError("");
                setLogemail("");
                setLogpassword("");




                if(userDetail.data.isAdmin===true){
                    
                    navigate("/viewAppointment")
                    console.log("view appointment")
                }
                else if(userDetail.data.isAdmin===false){
             
                await checkApp(userDetail.data.email);

                    
                }

            }

        }
        catch(err){
            // console.log(err);
            setError(err.response.data.errorMessage);
        }
    }


    return (
        <>
         <div className={success}>Sign Up Successfully
        <button className="closeBtn" onClick={()=>setSuccess("successCont")} >X</button>
        </div>

            <fieldset className={form1}>
                <legend>Login</legend>
                <input type="email" 
                value={email} onChange={(e)=>setLogemail(e.target.value)}
                placeholder="Enter Email"/>

         
                <input type="password" 
                 value={password} onChange={(e)=>setLogpassword(e.target.value)}
                                placeholder="Enter Password" />

                <div className="error_container">{error}</div>

                <button onClick={handleLog}>Login</button>

                <div className="link">
                    Create an account ? <div className="regLink" onClick={showSignUp}>Sign Up</div>
                </div>
            </fieldset>







            <fieldset className={form2}>
                <legend>Sign up</legend>

                <input type="text"  placeholder="Enter Name" value={regname} onChange={(e)=>setRegname(e.target.value)} />
              

                <input type="email"  placeholder="Enter Email"
                     value={regemail} onChange={(e)=>setRegemail(e.target.value)}
                />

         
                <input type="password"  placeholder="Enter Password"
                 value={regpassword} onChange={(e)=>setRegpassword(e.target.value)} />

                <input type="password"  placeholder="Confirm Password"
                 value={regcpassword} onChange={(e)=>setRegcpassword(e.target.value)}
                 />

                 <div className="error_container">{error}</div>


                <button onClick={handleRegister} >SignUp</button>

                <div className="link">
                    Already have an account ? <div className="regLink" onClick={showLogin}>Log In</div>
                </div>
            </fieldset>
            
        </>
    )
}

export default Register;
