import './profile.scss'
import React, { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'
import { Avatar, DisplayAvatar } from '../../components'
import { BiEdit } from 'react-icons/bi'

const ProfilePage = () => {
  const { user } = useAuth()

  const [username, setUsername] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single()

      if (error) throw error
      if (data) {
        setUsername(data.username)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message_description || error.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username: username,
        avatar_url: avatar_url,
        updated_at: new Date(),

      }
      const { error } = await supabase
        .from('profiles')
        .upsert(updates)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
      setEditing(false)
    }
  }

  const handleTest = (e) => {
    e.preventDefault()
    setEditing(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className='profile-page page'>
      {!loading ?
        <>
          {!editing ?
            <div className="form-display">
              <DisplayAvatar
                url={avatar_url}
                size={150}
              />
              <label htmlFor="display-email">
                Email:
                <input
                  id='display-email'
                  type="text"
                  value={user.email}
                  onChange={() => {}}
                  disabled
                />
              </label>
              <label htmlFor="display-username">
                Username:
                <input
                  id='display-username'
                  type="text"
                  value={username}
                  onChange={() => {}}
                  disabled
                />
              </label>
              <button className='edit-btn' onClick={() => setEditing(true)}><BiEdit /></button>
            </div>
          :
            <div className="form-edit">
              <Avatar
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                  setAvatarUrl(url)
                  handleUpdate({ username, avatar_url: url })
                }}
              />
              <label htmlFor="email">
                Email:
                <input
                  id='email'
                  className='disable-entry'
                  type="text"
                  value={user.email}
                  onChange={() => {}}
                  disabled
                />
              </label>
              <form onSubmit={handleUpdate}>
                <label htmlFor="username">
                  Username:
                  <input
                    id='username'
                    className='entry'
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </label>
                <button className='btn'>Save</button>
              </form>
            </div>
          }
        </>
      :
        <p>Loading...</p>
      }
    </div>
  )
}

export default ProfilePage