import './updatedetails.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {  useEffect } from "react";
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

function UpdateDetails() {
     const{register,handleSubmit,formState:{errors}}=useForm()
      let {login,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let [data,setData]=useState({'lc':{'username':'loading'},
                                'cc':{'username':'loading'} ,
                                'cf':{'username':'loading'} ,
                                'spoj':{'username':'loading'}                                  


})
    let navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:3000/profile/getdetails/${login.username}`)
        .then(res=>setData(res.data.payload))
       
    },[])
    var onFormSubmit=async(obj)=>{
        setLoading(true)
        if(obj['lc_username']==''){
            obj['lc_username']=data.lc.username
        }
        if(obj['cc_username']==''){
            obj['cc_username']=data.cc.username
        }
        if(obj['cf_username']==''){
            obj['cf_username']=data.cf.username
        }
        if(obj['spoj_username']==''){
            obj['spoj_username']=data.spoj.username
        }
        obj['username']=login.username

        let result= await axios.put('http://localhost:3000/profile/updateUserProfile',obj)
        let dat=result.data
        if(dat.message=='data updated successfully'){
            
            navigate('/userdashboard')
        }
        else{
            setLoading(false)
            alert(dat.message)
        }
    }
    return ( 
           <div>
         {loading==false&&
                <div className="container-fluid">
                    <form className="form-center details-form " onSubmit={handleSubmit(onFormSubmit)}>

                        <div className="form-label ">Enter Your Details</div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="lc_username" placeholder={data.lc.username} {...register('lc_username')} />
                            </div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="cc_username" placeholder={data.cc.username} {...register('cc_username')} />
                            </div>
                             <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="cf_username" placeholder={data.cf.username}{...register('cf_username')} />
                            </div>
                             <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="spoj_username" placeholder={data.spoj.username} {...register('spoj_username')}/>
                            </div>
                           <div className='text-center'>
                            <button type="submit" className="btn btn-primary text-center  mt-3">Submit</button>
                            </div>
                            
                    </form>
       </div>
}
        {loading==true&&
            <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <RingLoader
            color="#3637d6"
            cssOverride={{}}
            loading
            speedMultiplier={2}
            />
            </div>
            }
        </div>
     );
}

export default UpdateDetails;