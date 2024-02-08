import React, { memo } from 'react'
import '../../assets/css/Profile.scss'

export default memo(function Profile() {

  return (
      <div className="profile-style">
            <div className="card">
                <img src={require(`../../assets/images/profile.png`)} alt="Jane" className='w-100'/>
                <div className="container-profile">
                    <h2>Ahmad</h2>
                    <div className='center'>
                       <p>Demo Data is a company built by ucts to prospective</p>
                       <p>Demo Data is a company built by ucts to prospective</p>
                       <p>Demo Data is a company built by ucts to prospective  </p>
                       <p>Demo Data is a company built by ucts to prospective  </p>
                       <p>Demo Data is a company built by ucts to prospective  </p>
                       <p>Demo Data is a company built by ucts to prospective  </p>
                    </div>
                </div>
            </div>
        </div>
  )
})
