import { useAuth, UserButton } from '@clerk/clerk-react'
import React, { useState } from 'react'
import axios from 'axios';


const Dashboard = () => {
    const [token,setToken]=useState("");
    const { getToken } = useAuth();
    const fetchTask = async ()=>{
     const t =  await getToken();
     setToken(t);
     console.log("something..");
     const response=await axios.get('http://localhost:3000/protected/test',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      
    );
    console.log(response.data);
    // setToken(response);

}
    
     
    
    
  return (
    <>
      <h2>Dashboard</h2>
      
        <UserButton/>

       <h4 onClick={()=>{
        fetchTask();
       }}>token : {token}</h4>
    </>
  )
}

export default Dashboard