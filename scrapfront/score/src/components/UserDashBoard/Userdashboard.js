import { useState, useEffect } from "react";
import axios  from "axios";
import { useSelector } from "react-redux";
function Userdashboard() {  

    let {login,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
   let [data,setData]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/profile/getdetails/${login.username}`)
        .then(res=>console.log(res.data))
    },[])

    return ( 
        <div>
            hello
           
        </div>
     );
}

export default Userdashboard;   