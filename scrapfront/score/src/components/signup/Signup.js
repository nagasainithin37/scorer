import {useForm} from 'react-hook-form'
import login_img from './login.png'
import axios from 'axios'
import './signup.css'
import { useNavigate } from "react-router-dom";
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";


function Signup() {

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
   const {register,handleSubmit,formState:{errors}}=useForm()

   var onSubmit=async(obj)=>{
    setLoading(true)
    let result=await axios.post('http://localhost:3000/users/createuser',obj)
    let data=result.data
    if(data.message==='User Created Successful'){
        console.log('signup successful')
        localStorage.setItem('username',obj.username);
        console.log("local storage set")
        setLoading(false)
        navigate('/Enter-details')
    }
    else{
        console.log(data)
        alert(data.message)
        setLoading(false)
    }
    
   }
   const navigate = useNavigate();
    return (    
        <div>
           {loading==false &&
            <div className="container-fluid">

            <div className="row">
                <div className="col-lg-6">
                      {/* Image  */}
                    <div className="container">
                        <img src={login_img} alt="" className='login_img' />
                    </div>

                </div>
                <div className="col-lg-6 my-auto">
                    {/* Form */}
                <div className="container">

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-label">signUp</div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control" id="username" placeholder='Username' style={{outline:'none'}} {...register('username')} />
                            </div>
                            <div className="mb-3">
                               
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password' {...register('password')} />
                            </div>
                           <div className='d-flex justify-content-center w-50'>
                            <button type="submit" className="btn btn-primary  mt-3">Submit</button>
                            </div>
                    </form>

                </div>

                </div>
            </div>

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

export default Signup;