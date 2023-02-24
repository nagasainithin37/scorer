import './details.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";
function Details() {

    const{register,handleSubmit,formState:{errors}}=useForm()
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let navigate=useNavigate();
    var onFormSubmit=async(obj)=>{
        setLoading(true)
        console.log(obj)
        obj['username']=localStorage.getItem('username')
        let result= await axios.post('http://localhost:3000/profile/createDetails',obj)
        let data=result.data
        localStorage.clear()
        if(data.message=='data inserted successfully'){
            
            navigate('/login')
        }
        else{
            setLoading(false)
            alert(data.message)
        }
    }

    return (    
        <div>
         
         {loading==false&&
                <div className="container-fluid">
                    <form className="form-center details-form " onSubmit={handleSubmit(onFormSubmit)}>

                        <div className="form-label ">Enter Your Details</div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="lc_username" placeholder='LeetCode Username' {...register('lc_username')} />
                            </div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="cc_username" placeholder='CodeChef Username' {...register('cc_username')} />
                            </div>
                             <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="cf_username" placeholder='CodeForce Username' {...register('cf_username')} />
                            </div>
                             <div className="mb-3">
                               
                                <input type="text" className="form-control text-center" id="spoj_username" placeholder='Spoj Username'  {...register('spoj_username')}/>
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

export default Details;