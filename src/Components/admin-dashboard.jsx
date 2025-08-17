import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AdminDashBoard(){

    const[cookie,setCookie,removeCookie]=useCookies('adminName');
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Comments:'',Likes:0,CategoryId:0}])
    let navigate=useNavigate();
    
    function LoadVideos(){
        axios.get('http://127.0.0.1:5000/videos')
        .then(response=>{
            setVideos(response.data)
        })
    }

    useEffect(()=>{
        
        if(cookie['adminName']===undefined){
            navigate('/adminlogin')
        }else{
            LoadVideos();
        }
    },[])
    return(
        <div>
            <h3>{cookie['adminName']} - DashBoard</h3>
            <div className="mb-3">
                <Link className="btn btn-primary" to='/addvideo'>New Video</Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        videos.map(video=>
                            <tr key={video.VideoId}>
                                <td width='300'>{video.Title}</td>
                                <td>
                                    <iframe src={video.Url} width='300' height='200'></iframe>
                                </td>
                                <td>
                                    <Link to={`/editvideo/${video.VideoId}`} className="btn btn-info bi bi-pen-fill me-3"></Link>
                                    <Link to={`/deletevideo/${video.VideoId}`} className="btn btn-danger bi bi-trash-fill"></Link>
                                </td>
                            </tr>
                            )
                    }
                </tbody>

            </table>
        </div>
    )
}



