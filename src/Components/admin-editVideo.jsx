import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export function EditVideo(){
    const[categories,setCategories]=useState([{Category_Id:0,CategoryName:''}])
    const[videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Comments:'',Likes:0,CategoryId:0}])
    let navigate=useNavigate();

    let params=useParams();

    
    const formik=useFormik({
        initialValues : {
            VideoId :videos[0].VideoId,
            Title: videos[0].Title,
            Url : videos[0].Url,
            Comments : videos[0].Comments,
            Likes : videos[0].Likes,
            CategoryId :videos[0].CategoryId,
        },
        enableReinitialize : true,
        onSubmit :(values)=>{
            axios.put(`http://127.0.0.1:5000/editvideo/${params.id}`,values)
            alert('Video Updated')
            navigate('/admindashboard')
        }
        // onSubmit : (values)=>{
        //     // axios.post('http://127.0.0.1:5000/addvideo',values);
        //     // alert('Video Added Successfully.....')
        //     // navigate('/admindashboard')
        // }

    }) 

    function LoadCategory(){
        axios.get('http://127.0.0.1:5000/categories')
        .then(response=>{
            response.data.unshift({CategoryId:-1,CategoryName:'Select Category'})
            setCategories(response.data);
        })
    }
    
    useEffect(()=>{
        LoadCategory();
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data)
        })
    },[])
    return(
        <div>
            <h3>Edit Videos</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>VideoId</dt>
                    <dd><input type="number" value={formik.values.VideoId} name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title} name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" value={formik.values.Comments} name="Comments" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" value={formik.values.Likes} name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange}>
                           {
                            categories.map(category=>
                                <option value={category.Category_Id} key={category.Category_Id}>
                                    {category.CategoryName.toUpperCase()}
                                </option>
                                )
                           }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to='/admindashboard' className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}