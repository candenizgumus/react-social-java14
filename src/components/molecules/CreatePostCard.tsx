import  React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {  SocialDispatch, useAppSelector } from '../../store'
import { fetchCreatePost, fetchGetPostList } from '../../store/features/postSlice'
import swal from 'sweetalert'


function CreatePostCard() {
  const dispatch = useDispatch<SocialDispatch>()
  const token = useAppSelector(state => state.auth.token)
  const [comment, setComment] = useState('')
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [photo, setPhoto] = useState('http://picsum.photos/500/500');
  const createPost = () => {
    dispatch(fetchCreatePost({
      token: token,
      comment: comment,
      url: 'http://picsum.photos/500/500'
    })).then(()=>{
      swal("Basarili!", "Post olusturuldu!", "success")
      .then(()=>{
        dispatch(fetchGetPostList(token))
      })
    })
  }
  return (
    <div className="card-header bg-transparent">
    <form className="form-inline">
        <div className="input-group w-100">
            <img  onClick={() => ref.current?.click()}  src={photo} width={'60px'} height={'60px'} style={{margin: '7px', borderRadius: '50%'}} alt=''/>
            <input onChange={evt => setPhoto(URL.createObjectURL(evt.target.files![0]))} type='file' hidden ref={ref}/>
            <textarea onChange={e => setComment(e.target.value)} rows={5} name="message" id="message" placeholder="Message" className="form-control form-control-sm" />
            <div className="input-group-append" style={{margin: '2px'}}>
                    <div onClick={createPost} className="input-group-text hover-post-button" style={{width: '60px', height:'60px'}}>
                        <i  className="fa-solid fa-arrow-up-from-bracket fa-xl ms-2"></i>
                    </div>
           </div>
        </div>
    </form>
</div>
  )
}

export default CreatePostCard