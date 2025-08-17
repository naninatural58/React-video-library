import axios from "axios"
import { Formik, useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Register() {

  const[users,setUsers]=useState([{UserId:'',UserName:'',UserEmail:'',UserPassword:'',UserMobile:''}])
  const[userError,setUserError]=useState('')
  

    const navigate=useNavigate()

    useEffect(()=>{
      axios.get('http://127.0.0.1:5000/users',users)
      .then(response=>{
        setUsers(response.data);
      })
    },[])


    const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            UserEmail:'',
            UserPassword:'',
            UserMobile:''
        },
        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:5000/adduser',user)
            alert("Register Successfully")
            navigate('/userlogin')
        }
    })
    
    function verifyUserId(e){
        for(var user of users){
          if(user.UserId=e.target.value){
            setUserError("User Id taken - Try Another");
            break;
          }else{
            setUserError("User Id Available");
          }
        }
    }
  return (
    <div>
      <h2>Register Here</h2>
        <form onSubmit={formik.handleSubmit} >
            <dl>
            <dt>User Id</dt>
            <dd><input type='text' onKeyUp={verifyUserId} onChange={formik.handleChange} name='UserId'/></dd>
            <dd>{userError}</dd>
            <dt>User Name</dt>
            <dd><input type='text' onChange={formik.handleChange} name='UserName'/></dd>
            <dt>Email</dt>
            <dd><input type='email' onChange={formik.handleChange} name='UserEmail'/></dd>
            <dt>Password</dt>
            <dd><input type='password' onChange={formik.handleChange} name='UserPassword'/></dd>
            <dt>Mobile</dt>
            <dd><input type='number' onChange={formik.handleChange} name='UserMobile'/></dd>
            </dl>
            <button className='btn btn-info me-2'>Register</button>
            <button to='/' className="btn btn-danger">Cancel</button>
        </form>
    </div>
  )
}


