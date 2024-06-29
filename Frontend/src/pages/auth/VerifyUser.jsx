import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const VerifyUser = () => {
  const {id} = useParams()
    const navigate = useNavigate()
    const [status,setStatus] = useState('')
    const verifyUser = async () =>{
        const response = await axios.post(`http://localhost:3000/auth/verify-user/${id}`,id)
        console.log(response.data)
        // setStatus(response.data.status)
    }
    useEffect(()=>{
        verifyUser()
    },[])
  return (
    <>
    <h1>Verify page</h1>
      {
          status === '201' ? 
          <>
          <h1>User verified Successfully</h1>
          {setTimeout(()=>{
              navigate('/')
            },5000)}
          </>
            : 
            <h1>Verification failed</h1>
      }
    
    </>
  )
}

export default VerifyUser
