import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter, Link } from 'react-router-dom';


export function Main(){
    const[userEmail,setEmail]=useState('')
    const[users,setUsers]=useState([{UserId:'',UserName:'',UserEmail:'',UserPassword:'',UserMobile:''}])
    const[userError,setUserError]=useState('')

     useEffect(()=>{
        axios.get('http://127.0.0.1:5000/users')
        .then(response=>{
            setUsers(response.data)
        })
     },[])

     function RegisterLink(){
        return(
           <div>
            <Link className="btn btn-light mt-2 justify-content-center" to="/uregister">Account Not Found-Register</Link>
           </div>
        )
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }
     function handleGetStartedClick(){
        var user=users.find(item=>item.Email===userEmail)
        console.log(user);
        if(user===undefined){
            setUserError(<RegisterLink/>)
        }
     }
     
    return(
        <div>
            <main className='d-flex justify-content-center mt-4'>
                <div>
                <h1>Watch Videos Any Where</h1>
                <p className='text-center mt-4 mb-4'>Please Register For More Tech videos</p>
                    <div className='input-group'>
                    <input onChange={handleEmailChange} type='email' className='form-control' placeholder='Enter Your Email'/>
                    <Button onClick={handleGetStartedClick} color='error' variant='contained'>Get Started</Button>
                    </div>
                    <p className="text-danger d-flex justify-content-center">{userError}</p>
                </div>
          </main>
        </div>
    )
}