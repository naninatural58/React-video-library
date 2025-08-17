// import { TextField } from "@mui/material";

// export function MaterialUi(){
//     return(
//         <div>
//             <h2>Hello</h2>
//             <div className="w-25">
//             <TextField label="User Name" variant="outlined" color="info"/>
//             </div>
//         </div>
//     )
// }
// import logo from './logo.svg';
// import './App.css';
// import $, { ajax } from "jquery"
// import axios from 'axios';
// import { useEffect, useState } from 'react';



// function App() {
//   const [categories,setCategories]=useState([])

//   useEffect(()=>
//   {
//     // $.ajax({
//     //   method:"get",
//     //   url:'http://127.0.0.1:5000/categories',
//     //   success:(categories)=>{
//     //     setCategories(categories);
//     //   }
//     // })

//     axios.get("http://127.0.0.1:5000/categories")
//     .then((response)=>{
//       setCategories(response.data);
//     })
//   },[])
//   return (
//     <div>
//       <h2>API Demo</h2>
//         <select>
//           {
//             categories.map(category=>
//               <option key={category.Category_Id}>{category.CategoryName}</option>
//               )
//           }
//         </select>
//     </div>
//   );
// }

// export default App;
