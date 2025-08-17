import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Main } from './Components/video-Main';
import Register from './Components/user-Register';
import { Login } from './Components/user-login';
import { UserDashboard } from './Components/user-DashBoard';
import { useCookies } from 'react-cookie';
import { AdminLogin } from './Components/admin-login';
import { AdminDashBoard } from './Components/admin-dashboard';
import { AddVideo } from './Components/adminAddVideo';
import { EditVideo } from './Components/admin-editVideo';
import { DeleteVideo } from './Components/admin-deleteVideo';

function SignOutComponent(){
  const[cookie,setCookie,removeCookie]=useCookies('userName')
  let navigate=useNavigate();
  function handleSignOut(){
    removeCookie('userName');
    navigate('/userlogin')
  }
  return(
    <button onClick={handleSignOut} className='btn btn-light me-2'>SignOut</button>
  )
}

function App() {
  const[cookie,setCookie,removeCookie]=useCookies('userName')
  return(
    <div className='container-fluid bg-dark text-light' style={{height:'100vh'}}>
      <BrowserRouter>
        <header className='p-2 justify-content-between d-flex'>
          <div>
            <span className='h2'><Link to='/' style={{color:'white',textDecoration:'none'}}>Video Library</Link></span>
          </div>
          <div>
            {
              (cookie['userName']===undefined) ? <Link className='btn btn-light me-2' to="/userlogin">SignIn</Link> : <SignOutComponent/>
            }
            
            <Link className='btn btn-light' to='/adminlogin'><span className='bi bi-person-fill'>Admin DashBoard</span></Link>
          </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/uregister' element={<Register/>}/>
            <Route path='/userlogin' element={<Login/>}/>
            <Route path="userdashboard" element={<UserDashboard/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path='/admindashboard' element={<AdminDashBoard/>}/>
            <Route path='/addvideo' element={<AddVideo/>}/>
            <Route path='/editvideo/:id' element={<EditVideo/>}/>
            <Route path='deletevideo/:id' element={<DeleteVideo/>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  )   
 
  
}

export default App;
