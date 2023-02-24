import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Loginn=createAsyncThunk('login',async(userCredentialsObj,thunkApi)=>{
    let result=await axios.post('http://localhost:3000/users/login',userCredentialsObj);
    let data=result.data
    if(data.message==='LoginSuccess'){
            localStorage.setItem('token',data.payload)
        return data
        }
        else{
            return thunkApi.rejectWithValue(data.message)
        }
})

export const userLogin=createSlice({
    name:'login',
    initialState:{login:{},isPending:false,isSuccess:false,isError:false,errMsg:''},
    reducers:{
        setIsError:(state)=>{
            state.isError=false;
        }
    },
    extraReducers:{
        [Loginn.pending]:(state,action)=>{
            state.isError=false;
            state.isPending=true
            state.isSuccess=false
            state.login={};
            state.errMsg='';
        },
        [Loginn.rejected]:(state,action)=>{
            state.isError=true;
            state.isPending=false;
            state.isSuccess=false;
            state.login={};
            state.errMsg=action.payload;
        },
        [Loginn.fulfilled]:(state,action)=>{
            state.isError=false;
            state.isPending=false;
            state.isSuccess=true;
            state.login=action.payload;
            state.errMsg='';
        }
    }
})

export const {setIsError}=userLogin.actions
export default userLogin.reducer