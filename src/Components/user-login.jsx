import axios from "axios";
import { Link} from 'react-router-dom';
import { Formik, useFormik } from "formik";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function Login(){
    const[users,setUsers]=useState([{UserId:'',UserName:'',UserEmail:'',UserPassword:'',UserMobile:''}])
    const[userError,setUserError]=useState('')
    const[cookie,setCookie,removeCookie]=useCookies('userName');

    var navigate=useNavigate();

    
    const formik=useFormik({
        initialValues : {
            UserId:'',
            UserPassword:'',
        },
        onSubmit:(values)=>{
            var user=users.find(item=>item.UserId==values.UserId)
            if(user.UserPassword==values.UserPassword){
                setCookie('userName',user.UserName);
                navigate("/userdashboard");
            }else{
                setUserError("Invalid Credentials")
            }
        }
    })

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/users")
        .then((response)=>{
            setUsers(response.data)
        })
    },[])

    return(
        <div>
            <h1>Login page</h1>
            <form onSubmit={formik.handleSubmit}>
            <dl>
                <dt>UserId</dt>
                <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                <dt>Password</dt>
                <dd><input type="password" name="UserPassword" onChange={formik.handleChange}/></dd>
            </dl>
            <button className="btn btn-danger">Login</button>
            <Link to="/uregister" className="btn btn-success ms-2">New User ?</Link>
            <p className="h4 text-danger">{userError}</p>
            </form>
            
        </div>
    )
}