import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchScore } from "../../slice/scores";




function Home() {

    let {scores,isPending,isError,errorMessage}=useSelector(state=>state.scores)
    let dispatch=useDispatch()

    useEffect(()=>{
        let actionObj=fetchScore('http://localhost:3000/profile/getProfiles')
        dispatch(actionObj)
    },[])


    return (    
        <div>
            Home
        </div>  );
}

export default Home;