import React, { useState, useEffect } from 'react'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'
import { useNavigate } from 'react-router-dom'

const SetUsername = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', user.id)
        .single()

      if (error) throw error
    } catch (error) {
      alert(error.message_description || error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
      navigate('/profile')
    }
  }

  return (
    <div className='set-username page'>
      {!loading ? 
        <>
          <h1>Set Username</h1>
          <div className='form-con'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                className='entry'
                id='username'
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button className='btn'>Save</button>
            </form>
          </div>
        </>
      :
        <p>Loading...</p>
      }
    </div>
  )
}

export default SetUsername