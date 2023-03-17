import './myPost.scss'
import React, { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'
import { MyPostCard } from '../../components'

const MyPostPage = () => {
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const getPost = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from ('posts')
        .select('*, profiles(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) {
        setPosts(data)
      }
    } catch (error) {
      alert(error.message_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  // console.log(posts)

  return (
    <div className='my-post page'>
      <h1>My Post</h1>
      <div className='posts'>
        {loading ?
          <p>Loading...</p>
        :
          posts.map(post => (
            <MyPostCard
              key={post.id}
              avatar={post.profiles.avatar_url}
              username={post.profiles.username}
              content={post.content}
            />
          ))
        }
      </div>
    </div>
  )
}

export default MyPostPage