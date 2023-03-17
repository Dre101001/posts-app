import './navbar.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import supabase from '../../supabaseClient'
import { useAuth } from '../../Auth'
import { BiMenu } from 'react-icons/bi'
import { GrFormClose } from 'react-icons/gr'

const Navbar = () => {
  const { user } = useAuth()

  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    }
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className='navbar'>
      <div className='nav'>
        <div className='logo'>
          <img src={logo} alt="logo" />
          <span>osts</span>
        </div>
        <ul className={`lg-screen ${isOpen ? 'active' : ''}`}>
          <li><Link className='link' to='/'>Home</Link></li>
          <li><Link className='link' to='/my-posts'>My Posts</Link></li>
          <li><Link className='link' to='/profile'>Profile</Link></li>
          <li><Link className='link' to='/updates'>Updates</Link></li>
          {user && <li><span className='link' onClick={handleLogout}>Logout</span></li>}
        </ul>
        <div className='sm-screen'>
          <button className='menu-btn-open' onClick={toggleMenu}><BiMenu /></button>
          <ul className={isOpen ? 'active' : ''}>
            {/* <button className='menu-btn-close'><GrFormClose /></button> */}
            <li><Link className='link' to='/' onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link className='link' to='/my-posts' onClick={() => setIsOpen(false)}>My Posts</Link></li>
            <li><Link className='link' to='/profile' onClick={() => setIsOpen(false)}>Profile</Link></li>
            <li><Link className='link' to='/updates' onClick={() => setIsOpen(false)}>Updates</Link></li>
            {user && <li><span className='link' onClick={handleLogout}>Logout</span></li>}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar