import { configureStore} from "@reduxjs/toolkit";
import userLogin from './slice/userSlice'
export const store=configureStore({
    reducer:{
        user:userLogin
    }
})