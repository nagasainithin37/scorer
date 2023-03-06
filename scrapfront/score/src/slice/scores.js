import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchScore=createAsyncThunk('getScore',async(url,thunkApi)=>{
try{
    let result=await axios(url);
    let data=result.data.payload
    console.log(data)
    return data
}
catch(e){
    return thunkApi.rejectWithValue('Unable to fecth details')
}
})

export const scoreSlice=createSlice({
    name:'scores',
    initialState:{'scores':[],isPending:false,isError:false,errMsg:''},
    reducers:{},
    extraReducers:{

        [fetchScore.pending]:(state,action)=>{
            state.isPending=true;
            state.isError=false;
            state.errorMessage='';
            state.scores=[];
        },
        [fetchScore.fulfilled]:(state,action)=>{
            state.scores=action.payload;
            state.isPending=false;
            state.isError=false;
            state.errorMessage='';
        },
        [fetchScore.rejected]:(state,action)=>{
            state.isError=true;
            state.errorMessage=action.payload;
            state.scores=[];
        },

    }
});


export default scoreSlice.reducer;