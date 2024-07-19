import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { IResponse } from "../../components/models/IResponse"
import { IPost } from "../../components/models/IPost"
import { IComment } from "../../components/models/IComment"
import { ICommentResponse } from "../../components/models/ICommentResponse"
import { ICommentListByPost } from "../../components/models/ICommentListByPost"
interface IInitialPost{
    postList:IPost[],
    isPostLoading:boolean
    sendMessagePostId: number
    isPopUpOpen : boolean
    commentList:ICommentResponse[]
    showMoreCommentList:ICommentResponse[]
    isShowMoreOpen:boolean
    page:number
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
    commentList:[],
    showMoreCommentList:[],
    isShowMoreOpen:false,
    page:0
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

export const fetchCommentListByPost = createAsyncThunk(
    'post/fetchCommentListByPost',
    async (payload: ICommentListByPost) => {
        const response = await fetch('http://localhost:9090/comment/get-comment-list-by-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'postId': payload.postId,
                'page': payload.page,
                'size': payload.size
            })
        }).then(data => data.json())
        return response
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
        },
        setShowMoreOpen(state,action:PayloadAction<boolean>){
            state.isShowMoreOpen = action.payload
        },
        increasePageNumber(state){
            state.page = state.page + 1
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
           
        });
        builder.addCase(fetchCommentListByPost.fulfilled,(state,action:PayloadAction<IResponse>)=>{
            state.showMoreCommentList = action.payload.data
            state.showMoreCommentList = [...state.showMoreCommentList,...action.payload.data]
            
           
        });
        
       
    }
})

export default postSlice.reducer
export const {setPopUpOpen,setPostId,setShowMoreOpen,increasePageNumber} = postSlice.actions
