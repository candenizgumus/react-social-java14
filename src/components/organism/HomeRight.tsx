import React from 'react'
import LikeList from '../molecules/LikeList'

function HomeRight() {
  return (
    <div className="right-column">

                   
                    <div className="card shadow-sm mb-4">
                        <div className="card-footer">
                          <LikeList />
                            <p className="lead" style={{fontSize: '18px'}}>Dave really likes these nerds, no one knows why though.</p>
                        </div>                      
                    </div>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <p>&copy; 2024 Java Boost 14 </p>
                        </div>
                    </div>
                </div>
  )
}

export default HomeRight