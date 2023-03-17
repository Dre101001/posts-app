import './postCard.scss'
import React, { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'
import { DisplayAvatar } from '../../components'

const PostCard = (props) => {
  const { user } = useAuth()

  return (
    <div className='post-card'>
      <div className='top-sec'>
        <DisplayAvatar
          url={props.avatar}
          size={45}
        />
        <p>{props.username}</p>
      </div>
      <div className='content-sec'>
        <p>{props.content}</p>
      </div>
    </div>
  )
}

export default PostCard