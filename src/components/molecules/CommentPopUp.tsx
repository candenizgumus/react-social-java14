import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SocialDispatch, useAppSelector } from '../../store'
import { fetchGetAllComments, fetchGetPostList, saveComment, setPopUpOpen } from '../../store/features/postSlice';


function CommentPopUp() {
   const dispatch = useDispatch<SocialDispatch>();
   const isPopUpOpen = useAppSelector(state => state.post.isPopUpOpen);
   const [comment , setComment] = useState('');
   const token = useAppSelector(state => state.auth.token);
   const postId = useAppSelector(state => state.post.sendMessagePostId);

   const handleClose = () => {
       dispatch(setPopUpOpen(false));
       dispatch(fetchGetPostList(token));
   }

   const handleGonderButton = () => {
       dispatch(saveComment({
         postId : postId,
          comment : comment,
           token : token,
       })).then(() => {
        handleClose();
        dispatch(fetchGetAllComments());
       });
   }

   return (
     <>
       {isPopUpOpen && (
         <div className="modal show" style={{ display: 'block'  }} tabIndex={-1} role="dialog">
           <div className="modal-dialog" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Yorum</h5>
                 <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
               </div>
               <div className="modal-body">
                 <form>
                   <div className="mb-3">
                     <label htmlFor="message-text" className="col-form-label">Message:</label>
                     <textarea onChange={e => setComment(e.target.value)} className="form-control" id="message-text"></textarea>
                   </div>
                 </form>
               </div>
               <div className="modal-footer">
                 <button type="button" className="btn btn-secondary" onClick={handleClose}>Kapat</button>
                 <button type="button" className="btn btn-primary" onClick={handleGonderButton }>Gonder</button>
               </div>
             </div>
           </div>
         </div>
       )}
     </>
   )
}

export default CommentPopUp
