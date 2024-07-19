import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SocialDispatch, useAppSelector } from '../../store'
import { fetchCommentListByPost, setShowMoreOpen } from '../../store/features/postSlice';

import Comments from './Comments';


function ShowMorePopUp() {
   const dispatch = useDispatch<SocialDispatch>();
   const isShowMoreOpen = useAppSelector(state => state.post.isShowMoreOpen);
   const postId = useAppSelector(state => state.post.sendMessagePostId);
  const showMoreCommentList = useAppSelector(state => state.post.showMoreCommentList);
  const [page , setPage] = useState(0);

   const handleClose = () => {
       dispatch(setShowMoreOpen(false));
      
   }

   const handleShowMorePopUp = () => {
    
    dispatch(fetchCommentListByPost({
      postId : postId,
      size: 3,
      page : page
    }));
  }
  

   return (
     <>
       {isShowMoreOpen && (
         <div className="modal show" style={{ display: 'block'  }} tabIndex={-1} role="dialog">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Comments</h5>
                 <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
               </div>
               <div className="modal-body">
                 <form>
                   <div className="mb-3">

                   {
                                       
                                            showMoreCommentList?.map((comment,index)=>{
                                                
                                    
                                                  return <>
                                                      <Comments username={comment.username} avatar={comment.avatar} comment={comment.comment} sharedDate={comment.sharedDate} postId={comment.postId}/>
                                                </>
                                                
                                                
                                              })
                                            }
                   </div>
                 </form>
               </div>
               <div className="modal-footer">
               <button type="button" className="btn btn-secondary" onClick={()=>setPage(page+1)}>Daha Fazla</button>
                 <button type="button" className="btn btn-secondary" onClick={handleClose}>Kapat</button>
                
               </div>
             </div>
           </div>
         </div>
       )}
     </>
   )
}

export default ShowMorePopUp
