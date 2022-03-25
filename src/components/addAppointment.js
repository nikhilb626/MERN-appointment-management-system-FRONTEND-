import React,{useState,useContext} from 'react';
import AuthContext from "../context/authcontext";
import {addAppoint,getSlot1,getSlot2,getSlot3} from "../service/appointaxios";
import {useNavigate} from "react-router-dom";

const AddAppointment = () => {

    const navigate=useNavigate();

    const {username,useremail,checkApp,getNoticeReciept}=useContext(AuthContext);


    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [date,setDate]=useState("");
    const [slot,setSlot]=useState("");

    const [slot1Count,setSlot1Count]=useState(0);
    const [slot2Count,setSlot2Count]=useState(0);
    const [slot3Count,setSlot3Count]=useState(0);

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");
    const [error1,setError1]=useState("");


    const [btnClass,setBtnClass]=useState("checkBtn");

    const [containerClass,setContainerClass]=useState("toggle hide2");



    const handlePreDate=async(e)=>{
        e.preventDefault();
        setDate(e.target.value);
        setContainerClass("toggle hide2");
        setBtnClass("checkBtn");

    }


    const handleDate=async(e)=>{
        e.preventDefault();
        // console.log(e.target.value);
      try{
        if(date!==""){
            setLoading(true);


            const slot1Count=await getSlot1(date);
            const slot2Count=await getSlot2(date);
            const slot3Count=await getSlot3(date);
    
            console.log("slot 1 count- ",slot1Count.data);
            console.log("slot 2 count- ",slot2Count.data);
            console.log("slot 3 count- ",slot3Count.data);
            setSlot1Count(slot1Count.data);
            setSlot2Count(slot2Count.data);
            setSlot3Count(slot3Count.data);
            setContainerClass("toggle");
            setBtnClass("checkBtn hide2");
            setError("");

            setLoading(false);
    
        }else{
            setError("please fill the date first");
        }
      }catch(err){
          console.log(err);
      }


    }




    const handleAppoint=async(e)=>{
        e.preventDefault();
        try{
            if(name==="" || phone==="" || date==="" || slot===""){
                // console.log('please fill the form properly');
                setError1("please fill the form properly");
            }
            else if(name!=="" && phone!=="" &&date!=="" && slot!==""){

                const AppointObj={
                    name:username,email:useremail,
                    patientName:name,
                    patientPhone:phone,
                    appointmentDate:date,
                    slot:slot
                }

                // console.log(AppointObj);
              await addAppoint(AppointObj);
            setName("");
            setPhone("");
            setDate("");
            setSlot("");
            await checkApp(useremail);
            await getNoticeReciept();

            setError("");
            navigate("/reciept");
            

            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>

            <fieldset className="form">
                <legend>Make an Appointment</legend>

              
                <input type="text"  placeholder="Enter Patient Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="text"  placeholder="Enter phone no."
                value={phone} onChange={(e)=>setPhone(e.target.value)}
                 />
                <input type="date" value={date} onChange={handlePreDate} />

                 <div className="error_container">{error}</div>

               <button className={btnClass} onClick={handleDate}>check available slots</button>

{
    loading?(<><h3 className="loading">loading...</h3></>):(
        <>
        <div className={containerClass}>
               <select name="slots" className="select" id="slot" onChange={(e)=>setSlot(e.target.value)} >
                <option value="none" id="selected" className="options" selected>select slots</option>
                
                {slot1Count>=2?(<><option value="slot1" className="options full" disabled>9am-10am (slot full)</option></>):(<><option value="slot1" className="options" >9am-10am</option></>)}
                {slot2Count>=2?(<><option value="slot2" className="options full" disabled>10am-11am (slot full)</option>
</>):(
    <><option value="slot2" className="options">10am-11am</option>
</>
)}

{slot3Count>=2?(<> <option value="slot3" className="options full" disabled>11am-12pm (slot full)</option></>):(
    <>
    <option value="slot3" className="options">11am-12pm</option>
    </>
)}
                    
                                       
                    </select>

            
<div className="error_container">{error1}</div>
                <button onClick={handleAppoint}>Confirm</button>
               </div>
        </>
    )
}
                
             

             
            </fieldset>  
        </>
    )
}

export default AddAppointment;
