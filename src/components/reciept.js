import React,{useState,useContext,useEffect} from 'react';
import AuthContext from "../context/authcontext";
import { deleteAppointment, getIndividualReciept } from '../service/appointaxios';

const Reciept = () => {

    const {useremail,checkApp,show}=useContext(AuthContext);

    const [data,setData]=useState([]);
    const [date,setDate]=useState("");


    const [success,setSuccess]=useState("successCont");

    const getReciept=async()=>{
        const response=await getIndividualReciept(useremail);
        // console.log(response.data[0].name);
        setData(response.data[0]);
        setDate(response.data[0].appointmentDate.substring(0, 10));
        if(show===true){
            setSuccess("successCont show");

        }else{
            setSuccess("successCont");
        }
    }



    const deletehandle=async(id)=>{
        await deleteAppointment(id);
        await checkApp();
        
        
    }

    useEffect(()=>{
        getReciept();
    },[]);



    return (
        <>
   <div className={success}>Appointment Created
        <button className="closeBtn" onClick={()=>setSuccess("successCont")} >X</button>
    </div>

<div className="view_container">

<div className="head">Appointment Receipt</div>

<div className="nameDate">
<div className="name"><span>By : </span>{data.name}</div>
<div className="date">
    <span>Date : </span>{date}
</div>
</div>

<div className="patientName">
<span>Patient Name : </span>{data.patientName}
</div>
<div className="patientNumber">
<span>Patient Phone :</span> +91-{data.patientPhone}
</div>

<div className="appDate">
    <span>Appointment Date :</span> {date}
</div>

<div className="slotNumber">
    <span>Slot : </span>{data.slot==="slot1"?"9am-10am":data.slot==="slot2"?"10am-11am":data.slot==="slot3"?"11am-12pm":"N/A"}
</div>

<div className="Btn_container">
<span  onClick={()=>deletehandle(data._id)}>Cancel Appointment</span>

</div>


</div>
     
        </>
    )
}

export default Reciept;
