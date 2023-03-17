import './homePage.scss'
import React, { useState, useEffect } from 'react'
import { PostCard } from '../../components'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'

const HomePage = () => {
  const { user } = useAuth()

  const [client, setClient] = useState([])
  const [postContent, setPostContent] = useState('')

  const handleTest = (e) => {
    e.preventDefault()
    console.log('Submitted')
  }

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) {
        setClient(data)
      }
    } catch (error) {
      alert(error.message_description || error.message)
    } 
  }

  const addPosts = async (e) => {
    e.preventDefault()
    if (!postContent) {
      return alert('Please add some text before posting')
    }
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ user_id: user.id, content: postContent, created_at: new Date() })
        .select()

      if (error) throw error
    } catch (error) {
      alert(error.message_description || error.message)
    } finally {
      setPostContent('')
      getProfile()
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  // console.log(posts)

  return (
    <div className='home-page page'>
      <form onSubmit={addPosts}>
        <input
          className='entry'
          type="text"
          placeholder="What's on your mind?..."
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
        <button className='btn'>Add Post</button>
      </form>
      <div className='post-sec'>
        {client.map(post => (
          <PostCard
            key={post.id}
            avatar={post.profiles.avatar_url}
            username={post.profiles.username}
            content={post.content}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage