import { useForm } from 'react-hook-form'
import login_img from './login.png'
import './login.css'
import { useDispatch,useSelector } from 'react-redux';
import { Loginn } from '../../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";
import { setIsError } from '../../slice/userSlice';

function Login() {
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const {register,handleSubmit,formState:{errors}}=useForm()
    let{login,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
    let dispatch=useDispatch();
    let navigate=useNavigate();
    if(isSuccess==true){
        setLoading(false)
        navigate('/userdashboard')

    }
    
    if(isError===true ){
        let actObj=setIsError()
        dispatch(actObj)
        setLoading(false)
        alert(`${errMsg}`)
    }

    var onFormSubmit=(obj)=>{
        setLoading(true)
      
        dispatch(Loginn(obj))
    }

    return (    
        <div>
           
            <div className="container-fluid">
{loading==false&&
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

                    <form onSubmit={handleSubmit(onFormSubmit)}>

                        <div className="form-label">Login</div>
                            <div className="mb-3">
                               
                                <input type="text" className="form-control" id="username" placeholder='Username' {...register('username')} />
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

        </div>
     );
}

export default Login    
;