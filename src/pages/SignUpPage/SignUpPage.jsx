import './signUp.scss'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../../supabaseClient'

const SignUpPage = () => {
  const navigate = useNavigate()

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
    if (!email || !password) {
      alert('Please insert an email and password!')
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email: email, password: password })
      if (error) throw error
    } catch (error) {
      alert(error.message_description || error.message)
    } finally {
      setLoading(false)
      navigate('/setname')
    }
  }

  return (
    <div className='sign-up-page page'>
      <h1>Sign Up</h1>
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

          <button className="btn">Sign Up</button>
        </form>
        <p>Have an account? <Link to='/login' className='sign-up-link'>Login</Link></p>
      </div>
    </div>
  )
}

export default SignUpPage