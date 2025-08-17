import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export function AddVideo(){
    const[categories,setCategories]=useState([{Category_Id:0,CategoryName:''}])

    let navigate=useNavigate();

    const formik=useFormik({
        initialValues : {
            VideoId :0,
            Title: '',
            Url : '',
            Comments : '',
            Likes : 0,
            CategoryId : 0,
        },
        onSubmit : (values)=>{
            axios.post('http://127.0.0.1:5000/addvideo',values);
            alert('Video Added Successfully.....')
            navigate('/admindashboard')
        }

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
    },[])

    return(
        <div>
            <h4>New Video</h4>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>VideoId</dt>
                    <dd><input type="number" name="VideoId" onChange={formik.handleChange}/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="Title" onChange={formik.handleChange}/></dd>
                    <dt>Url</dt>
                    <dd><input type="text" name="Url" onChange={formik.handleChange}/></dd>
                    <dt>Comments</dt>
                    <dd><input type="text" name="Comments" onChange={formik.handleChange}/></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" name="Likes" onChange={formik.handleChange}/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="CategoryId" onChange={formik.handleChange}>
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
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}