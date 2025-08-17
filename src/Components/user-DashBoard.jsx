import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function UserDashboard(){

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
            <h3>{cookie['userName']}-DashBoard</h3>
            <section className="d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.VideoId} className="card p-2 m-2" style={{width:'400px'}}>
                            <div className="card-header" style={{height:'120px'}}>
                                    <h3>{video.Title}</h3>
                            </div>
                            <div className="card-body">
                                <iframe src={video.Url} width="100%" height='200'>

                                </iframe>
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-hand-thumbs-up">{video.Likes}Likes</span>
                                <div>
                                    <label className="form-label fw-bold">Comments</label>
                                    <div>{video.Comments}</div>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
        </div>
    )
}