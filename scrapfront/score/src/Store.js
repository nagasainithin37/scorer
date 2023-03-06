import { configureStore} from "@reduxjs/toolkit";
import userLogin from './slice/userSlice'
import scoreReducer from './slice/scores'
export const store=configureStore({
    reducer:{
        user:userLogin,
        scores:scoreReducer
    }
})