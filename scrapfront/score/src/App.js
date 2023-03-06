import { NavLink,Routes,Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/Home/Home";
import Details from "./components/Profiles/Details";
import Userdashboard from "./components/UserDashBoard/Userdashboard";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import { useSelector,useDispatch } from "react-redux";
import { signOut } from "./slice/userSlice";
import UpdateDetails from "./components/UpdateDetails/updateDetails";
function App() {

   let{login,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
let dispatch=useDispatch()
   var signOut=()=>{
let actionObj=signOut()
dispatch(actionObj)

   }

  return (  
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" >
  <div className="container-fluid">
    <NavLink className="navbar-brand text-light" to="#">Score</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item">
          <NavLink className="nav-link text-light" aria-current="page" to="">Home</NavLink>
        </li>
        { isSuccess==false &&<>        < li className="nav-item">
          <NavLink className="nav-link text-light" to="/signup">Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/login">Login</NavLink>
        </li>
        </>
        }
        { 
        isSuccess==true&&
        <>
         <li className="nav-item">
          <NavLink className="nav-link text-light" onClick={signOut} to="/login">Signout</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"  to="/userdashboard">DashBoard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light"  to="/updatedetails">updateDetails</NavLink>
        </li>
        </>
        }
        <li className="nav-item">
          <NavLink className="nav-link text-light" to="/leaderboard">Leader Board</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>



<Routes>

<Route path='' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/Enter-details' element={<Details/>}/>
<Route path='/userdashboard' element={<Userdashboard/>}/>
<Route path='/leaderboard' element={<LeaderBoard/>}/>
<Route path='/updatedetails' element={<UpdateDetails/>}/>
</Routes>




    </div>
  );
}

export default App;
