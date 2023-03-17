import React from 'react'
import { Navbar, ThemeBtn } from '../components'
import { useAuth } from '../Auth'

const Layout = ({ children }) => {

  const { user } = useAuth()

  return (
    <>
      <ThemeBtn />
      {user && <Navbar />}
      {children}
    </>
  )
}

export default Layout