import axios from "axios";

const userUrl=`http://localhost:5000/userapi`;

export const addUser=async(user)=>{
    return await axios.post(`${userUrl}/add`,user);
}

export const loginUser=async(userData)=>{
    return await axios.post(`${userUrl}/login`,userData);
}


export const logoutUser=async()=>{
    return await axios.get(`${userUrl}/logout`);
}


export const loggedInUser=async()=>{
    return await axios.get(`${userUrl}/loggedIn`);
}


