import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegister } from "../../components/models/IRegister";
import { ILogin } from "../../components/models/ILogin";
import { IResponse } from "../../components/models/IResponse";
import swal from 'sweetalert';

const initialAuthState = {
    token: '',
    user: [],
    isLoadingLogin: false,
    isLoadingRegister: false,
    isAuth: false

}
/**
 * @param  { username,password,repassword,email}
 */
export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (payload: IRegister) => {
      const response =   await fetch('http://localhost:9090/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'userName': payload.userName,
                'password': payload.password,
                'rePassword': payload.rePassword,
                'email': payload.email
            })
        }).then(data => data.json())

        return response
        
    }
)

export const fetchLogin = createAsyncThunk(

    
    'auth/fetchLogin',
    async (payload:ILogin) => {
        try{
            const response = await fetch('http://localhost:9090/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'userName': payload.userName,
                    'password': payload.password
                })
            }).then(res => 
                res.json()
            )
         
    
            return response;
        }catch(err){
            
        }

    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.pending, (state) => {
            state.isLoadingRegister = true
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoadingRegister = false
    });
    builder.addCase(fetchLogin.pending, (state) => {
        state.isLoadingLogin = true
    });
    builder.addCase(fetchLogin.fulfilled, (state, action:PayloadAction<IResponse>) => {
        state.isLoadingLogin = false
        if(action.payload.code === 200){
            state.token = action.payload.data;
            state.isAuth = true
        }else{
           swal("Hata", action.payload.message, "error");
        }
        
        
    });
    builder.addCase(fetchLogin.rejected, (state,action) => {
        console.log(action.payload)
        state.isLoadingLogin = false
    });

    }
});


export default authSlice.reducer