import axios from "axios";
import { Link} from 'react-router-dom';
import { Formik, useFormik } from "formik";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){
    const[users,setUsers]=useState([{UserId:'',Password:''}])
    const[userError,setUserError]=useState('')
    const[cookie,setCookie,removeCookie]=useCookies('adminName');

    
    var navigate=useNavigate();

    const formik=useFormik({
        initialValues : {
            UserId:'',
            Password:'',
        },
        onSubmit:(values)=>{
            var user=users.find(item=>item.UserId===values.UserId)
            if(user.Password===values.Password){
                setCookie('adminName',user.UserId);
                navigate("/admindashboard");
            }else{
                setUserError("Invalid Credentials")
            }
        }
    })

    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/admin")
        .then((response)=>{
            setUsers(response.data)
        })
    },[])
    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange}/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange}/></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <p className="h4 text-danger">{userError}</p>
            </form>
        </div>
    )
}