import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IResponse } from "../../components/models/IResponse"



export interface IUserProfile {
    name: string
    userName: string
    avatar: string
    followerCount: number
    followingCount: number
    about: string
    bornDate: number
    phone: string
    address: string
}

interface IUserState{
    userProfile : IUserProfile | null,
    isLoading : boolean,
}

const initialUserState:IUserState = {
    userProfile:  null,
    isLoading : false

}

export const fetchGetUserProfile = createAsyncThunk(
    'user/fetchGetUserProfile',
    async (payload:string) => {
       const response= await fetch('http://localhost:9090/user/get-profile?token='+payload)
       .then(data => data.json())
       return response;
        
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetUserProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetUserProfile.fulfilled, (state, action:PayloadAction<IResponse>) => {
                if(action.payload.code === 200){
                    state.userProfile = action.payload.data
                }
            })
            .addCase(fetchGetUserProfile.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default userSlice.reducer