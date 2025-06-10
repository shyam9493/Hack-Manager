import { useAuth, UserButton } from '@clerk/clerk-react'
import React, { useState } from 'react'

const Dashboard = () => {
    const [token,setToken]=useState("");
    const { getToken } = useAuth();
    const fetchTask = async ()=>{
     const t =  await getToken();
     setToken(t);
     console.log("something..");
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