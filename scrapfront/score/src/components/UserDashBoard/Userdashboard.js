import { useState, useEffect } from "react";
import axios  from "axios";
import { useSelector } from "react-redux";
import { Doughnut } from 'react-chartjs-2';
import { Chart } from "chart.js/auto";
import './UserDashBoard.css'


function Userdashboard() {  

    let {login,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
    let [score,setScore]=useState([0,1,2])
   let [data,setData]=useState({})
    useEffect(()=>{
        axios.get(`http://localhost:3000/profile/getdetails/${login.username}`)
        .then(res=>setData(res.data.payload))
       
    },[])
    
    const dta = {
  labels: [
    'LeetCode',
    'CodeChef',
    'CodeForces',
    'spoj'
  ],
  datasets: [{
    
    data: [data.lcScore,data.ccScore,data.cfScore,data.spojScore],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(0,255,0)',
    ],
    hoverOffset: 4
  }]
};
    return ( 
        <div>
            <div className="con">
                <Doughnut data={dta}/>
                </div>
           
        </div>
     );
}

export default Userdashboard;   