import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
export function DeleteVideo(){

    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Comments:'',Likes:0,CategoryId:0}])
    let navigate=useNavigate();

    let params=useParams();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data)
        })
    },[])

    

    
    function handleDeleteClick (){
        axios.delete(`http://127.0.0.1:5000/deletevideo/${params.id}`)
        alert('Video Deleted')
        navigate('/admindashboard')
    }

    return(
        <div>
            <h3>Delete Video</h3>
            <div>
                <h3>{videos[0].Title}</h3>
                <iframe src={videos[0].Url} width='400' height='300'>
                </iframe>
            </div>
            <div className="mt-3">
                <button onClick={handleDeleteClick} className="btn btn-danger me-2">Delete</button>
                <Link to='/admindashboard' className="btn btn-warning">Cancel</Link>
            </div>
        </div>
    )
}