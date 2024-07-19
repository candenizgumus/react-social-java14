import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IResponse } from "../../components/models/IResponse"
import { IPost } from "../../components/models/IPost"
import { IComment } from "../../components/models/IComment"
import { ICommentResponse } from "../../components/models/ICommentResponse"
interface IInitialPost{
    postList:IPost[],
    isPostLoading:boolean
    sendMessagePostId: number
    isPopUpOpen : boolean
    commentList:ICommentResponse[]
}
interface ICreatePostPayload {
    token:string,
    url:string,
    comment:string
}

const initialPostState:IInitialPost = {
    postList: [],
    isPostLoading: false,
    sendMessagePostId: 0,
    isPopUpOpen : false,
    commentList:[]
}

export const fetchCreatePost = createAsyncThunk(
    'post/fetchCreatePost',
    async (payload: ICreatePostPayload) => {
        const response = await fetch('http://localhost:9090/post/create-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'token': payload.token,
                'url': payload.url,
                'comment': payload.comment
            })
        }).then(data => data.json())
        return response
    }
)

export const fetchGetPostList = createAsyncThunk(
    'post/fetchGetPostList',
    async (token:string) => {
        const response = await fetch('http://localhost:9090/post/get-post-list?token='+token)
        .then(data => data.json());
        return response;
       
    }
)

export const saveComment = createAsyncThunk(
    'post/saveComment',
    async (payload:IComment) => {
        const response = await fetch('http://localhost:9090/comment/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'token': payload.token,
                'postId': payload.postId,
                'comment': payload.comment
            })
        }).then(data => data.json())
        return response
    }
)

export const fetchGetAllComments = createAsyncThunk(
    'post/fetchGetAllComments',
    async () => {
        const response = await fetch('http://localhost:9090/comment/get-comment-list')
        .then(data => data.json());
        console.log(response)
        return response;
       
    }
)



const postSlice = createSlice({
    name: 'post',
    initialState: initialPostState,
    reducers: {
    
        setPopUpOpen(state,action:PayloadAction<boolean>){
            state.isPopUpOpen = action.payload
        },
        setPostId(state,action:PayloadAction<number>){
            state.sendMessagePostId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreatePost.fulfilled,(state,action)=>{

        });
        builder.addCase(fetchGetPostList.pending,(state)=>{
           state.isPostLoading = true
        });
        builder.addCase(fetchGetPostList.fulfilled,(state,action:PayloadAction<IResponse>)=>{
            state.isPostLoading = false
            state.postList = action.payload.data
        });
    
        builder.addCase(fetchGetAllComments.fulfilled,(state,action:PayloadAction<IResponse>)=>{
            state.commentList = action.payload.data
            console.log(action.payload.data)
           
        })
       
    }
})

export default postSlice.reducer
export const {setPopUpOpen,setPostId} = postSlice.actions
