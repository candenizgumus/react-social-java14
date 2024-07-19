import React, { useState } from 'react'
import { getFormattedElapsedTime } from '../../util/Tools'
import { postSlice } from '../../store/features'
import store, { SocialDispatch, useAppSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { fetchCommentListByPost, increasePageNumber, setPopUpOpen, setPostId, setShowMoreOpen } from '../../store/features/postSlice'
import { IComment } from '../models/IComment'
import { ICommentResponse } from '../models/ICommentResponse'
import Comments from './Comments'
import ShowMorePopUp from './ShowMorePopUp'
interface IPostProps{
  postId: number,
  avatar:string,
  userName:string,
  comment:string,
  url:string,
  date:number,
  commentList?:ICommentResponse[]
  likeCount:number
  commentCount:number
 
}



function Post(props: IPostProps) {

  const dispatch = useDispatch<SocialDispatch>();
  const commentList = useAppSelector(state => state.post.commentList);
  const page = useAppSelector(state => state.post.page);
  



  const handleClick = () => {
    dispatch(setPopUpOpen(true));
    dispatch(setPostId(props.postId));
  }

  const handleShowMorePopUp = () => {
    dispatch(setShowMoreOpen(true));
    dispatch(setPostId(props.postId));
    dispatch(fetchCommentListByPost({
      postId : props.postId,
      size: 3,
      page : page
    }));
    
  }

  const increasePageNumberr = () => {
    dispatch(increasePageNumber());
  }
  return (
    <>
    
    <div className="card-body">
                            <div className="media">
                                <img src={props.avatar} alt="img" width="55px" height="55px" className="rounded-circle mr-3" />
                                <div className="media-body">
                                    <h5>@{props.userName}</h5>
                                    <p className="card-text text-justify">{props.comment}</p>
                                    <div className="col-12 p-1 text-center">
                                                <img src={props.url} alt="" className="img-fluid shadow-sm img-thumbnail" style={{width:"100%", height:'400px'}}/>
                                    </div>
                                   
                                    <p className="card-text" style={{marginLeft:'10px',marginBottom:'10px'}}> <i onClick={handleClick}  className="fa-solid fa-comments" style={{width:'30px'}}></i>{props.commentCount}
                                    <i className="fa-solid fa-heart" style={{width:'30px', marginLeft:'15px'}}></i>{props.likeCount}
                                     </p>

                                    
                                      <small>{getFormattedElapsedTime(props.date)}</small>
                                      {
                                       
                                       props.commentList?.map((comment,index)=>{
                                          
                                          if(comment.postId===props.postId){
                                            return <>
                                                <Comments username={comment.username} avatar={comment.avatar} comment={comment.comment} sharedDate={comment.sharedDate} postId={comment.postId}/>
                                          </>
                                          }
                                          
                                        })
                                      }

                                                <button onClick={()=> {handleShowMorePopUp();increasePageNumberr()}} className='btn btn-primary'>
                                                    Show More
                                                </button>
                                        
                                      
                                      
                                </div>                            
                            </div>
                        </div>                                  
                        <hr />
    </>
  )
}

export default Post