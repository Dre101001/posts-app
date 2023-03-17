import './login.scss'
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import supabase from '../../supabaseClient'

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email: email, password: password })
      if (error) throw error
    } catch (error) {
      alert(error.message_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page page'>
      {!session ?
        <>
          {!loading ?
            <>
              <h1>Login</h1>
              <div className='form-con'>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input
                    className='entry'
                    id='email'
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    className='entry'
                    id='password'
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />

                  <button className="btn">Login</button>
                </form>
                <p>Don't have an account? <Link to='/signup' className='sign-up-link'>Sign Up</Link></p>
              </div>
            </>
          :
            <p>Loading...</p>
          }
        </>
      :
        <Navigate to='/' />
      }
    </div>
  )
}

export default LoginPage