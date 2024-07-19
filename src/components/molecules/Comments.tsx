import React from 'react'
import { getFormattedElapsedTime } from '../../util/Tools'
import { IComment } from '../models/IComment'
import { ICommentResponse } from '../models/ICommentResponse'

function Comments(props:ICommentResponse) {
  return (
    
    
<div className="media mb-3 mt-5 shadow" >
                                              <img src={props.avatar} alt="img" width="45px" height="45px" className="rounded-circle mr-2" />
                                              <h5>@{props.username}</h5>
                                              <div className="media-body">
                                                    <p className="card-text text-justify">{props.comment}</p>
                                                    <h6>{getFormattedElapsedTime(props.sharedDate)}</h6>

                                            </div>
                                        </div>
    
  )
}

export default Comments