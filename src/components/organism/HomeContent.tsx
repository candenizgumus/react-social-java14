import  { useEffect } from 'react'
import CreatePostCard from '../molecules/CreatePostCard'
import Post from '../molecules/Post'
import { SocialDispatch, useAppSelector } from '../../store'
import { useDispatch } from 'react-redux'
import { fetchGetPostList } from '../../store/features/postSlice'

function HomeContent() {
  const postList = useAppSelector(state => state.post.postList)
  const dispatch = useDispatch<SocialDispatch>();
  const token = useAppSelector(state => state.auth.token)
  
  useEffect(() => {
    dispatch(fetchGetPostList(token))
  }, [])

  console.log(postList)
  return (
    <div className="middle-column">
                    <div className="card" >
                       <CreatePostCard />
                       {
                        postList.map((post,index) => {
                          return <Post key={index} avatar={post.avatar} userName={post.userName} comment={post.comment} url={post.photo} date={post.sharedDate} likeCount={post.likeCount} commentCount={post.commentCount} />
                        })
                       }
                       
                                               
                    </div>
    </div>

  )
}

export default HomeContent