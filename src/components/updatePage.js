import React,{useState,useEffect} from 'react';
import {getUpdateSetup,getSlot1,getSlot2,getSlot3,finalUpdateSet} from "../service/appointaxios";
import {useParams,useNavigate} from "react-router-dom";

const UpdatePage = () => {
    const navigate=useNavigate();

    const {id,date,slot}=useParams();

    const dated=date.substring(0, 10)


    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [patientName,setPatientName]=useState("");
    const [patientPhone,setPatientPhone]=useState("");


    const [error,setError]=useState("");
const [error1,setError1]=useState("");




    const [date1,setDate]=useState(dated);
    const [slot1,setSlot]=useState(slot);

    const [slot1Count,setSlot1Count]=useState(0);
    const [slot2Count,setSlot2Count]=useState(0);
    const [slot3Count,setSlot3Count]=useState(0);

    const [loading,setLoading]=useState(false);


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
      try{
        if(date1===""){
             // console.log("please fill the date first");
             setError("please fill the date first");
    
        }else if(date1!==""){
            setLoading(true);
           
            const slot1Count=await getSlot1(date1);
            const slot2Count=await getSlot2(date1);
            const slot3Count=await getSlot3(date1);
    
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

        }
      }catch(err){
          console.log(err);
      }


    }




    const handleUpdate=async(e)=>{
        e.preventDefault();
        try{
            if(date1==="" || slot1===""){
                // console.log("please fill the form properly");
                setError1("please fill the form properly");
            }else if(date1!=="" && slot1!==""){
                const updatedObj={
                    name:name,email:email,patientName:patientName,
                    patientPhone:patientPhone,appointmentDate:date1,slot:slot1
                }
                await finalUpdateSet(id,updatedObj);
                console.log(id,updatedObj);
                setError1("");
                navigate("/viewappointment");
                
            }
       
        }
        catch(err){
            console.log(err);
        }
    }





    const getDetail=async()=>{
        try{

       const detail= await getUpdateSetup(id);
            console.log(detail.data);
            setName(detail.data.name);
            setEmail(detail.data.email);
            setPatientName(detail.data.patientName);
            console.log("this is patient name- ",detail.data.patientName);
            setPatientPhone(detail.data.patientPhone);
            
            

        }catch(err){
            console.log(err);
        }
    }


    useEffect(()=>{
        getDetail();
    },[]);


 




    return (
        <>
      <fieldset className="form">
                <legend>Update Appointment</legend>

                <input type="date" value={date1} onChange={handlePreDate} />

                <div className="error_container">{error}</div>

               <button className={btnClass} onClick={handleDate}>check available slots</button>

{
    loading?(<><h3 className="loading">loading...</h3></>):(
        <>
        <div className={containerClass}>
               <select name="slots" value={slot1} className="select" id="slot" onChange={(e)=>setSlot(e.target.value)} >
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
                <button onClick={handleUpdate}>Confirm</button>
               </div>
        </>
    )
}
                
             

             
            </fieldset>  
        </>
    )
}

export default UpdatePage;
