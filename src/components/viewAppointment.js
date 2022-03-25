import React,{useEffect,useState} from 'react';
import { getAllAppointment ,deleteAdminAppointment} from '../service/appointaxios';
import {Link} from "react-router-dom";



const ViewAppointment = () => {


    const [data,setData]=useState([]);

    const [success,setSuccess]=useState("successCont");


    const getAppointments=async()=>{
        const response=await getAllAppointment();
        // console.log(response.data);
        setData(response.data);

    }

    const deleteHandle=async(id)=>{
        await deleteAdminAppointment(id);
        setSuccess("successCont show");

        getAppointments();
    }



    useEffect(()=>{
        getAppointments();
    },[]);




    return (
        <>
          <div className={success}>Deleted Successfully
        <button className="closeBtn" onClick={()=>setSuccess("successCont")} >X</button>
        </div>

{data.length<=0?(<><h1 className="headingSchedule">No Appointment Scheduled</h1></>):(
    <>
    <table id="customers">
  <tr>
    <th>Patient Name</th>
    <th>Patient Phone</th>
    <th>Date</th>
    <th>Slot</th>
    <th>Actions</th>
  </tr>

  
  {
      data.map((item)=>{
          return (
              <>
              <tr>
    <td>{item.patientName}</td>
    <td>+91-{item.patientPhone}</td>
    <td>{item.appointmentDate.substring(0, 10)}</td>
    <td>{item.slot==="slot1"?"9am-10am":item.slot==="slot2"?"10am-11am":item.slot==="slot3"?"11am-12pm":"N/A"}</td>
    <td className="actionCont">
    <Link className="updateBtn" exact to={`/update/${item._id}/${item.appointmentDate}/${item.slot}`}><i class="fas fa-edit"></i></Link>
        <span className="adminDelete" onClick={()=>deleteHandle(item._id)}><i class="fas fa-trash-alt"></i></span>
    </td>
  </tr>

              </>
          )
      })
  }
  
 
</table>
    </>
)}
        </>
    )
}

export default ViewAppointment;
