import axios from "axios";

const appointUrl=`http://localhost:5000/appointapi`;


export const addAppoint=async(appointment)=>{
    return await axios.post(`${appointUrl}/addAppoint`,appointment)
}


export const getSlot1=async(date)=>{
    return await axios.get(`${appointUrl}/slot1/${date}`);
}

export const getSlot2=async(date)=>{
    return await axios.get(`${appointUrl}/slot2/${date}`);
}

export const getSlot3=async(date)=>{
    return await axios.get(`${appointUrl}/slot3/${date}`);
}


export const getIndividualReciept=async(email)=>{
    return await axios.get(`${appointUrl}/showIndividual/${email}`);
}


export const checkAppointment=async(email)=>{
    return await axios.get(`${appointUrl}/checkapp/${email}`);
}

export const getAllAppointment=async()=>{
    return await axios.get(`${appointUrl}/showAll`);
}

export const getUpdateSetup=async(id)=>{
    return await axios.get(`${appointUrl}/updatesetup/${id}`);
}

export const finalUpdateSet=async(id2,data2)=>{
    return await axios.put(`${appointUrl}/finalupdate/${id2}`,data2);
}

export const deleteAppointment=async(id)=>{
    return await axios.delete(`${appointUrl}/${id}`);
}

export const deleteAdminAppointment=async(id)=>{
    return await axios.delete(`${appointUrl}/${id}`);
}