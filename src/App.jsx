import './App.scss'
import { useState } from 'react'
import { Navbar, Layout, ProtectedRoute } from './components'
import { HomePage, LoginPage, SignUpPage, SetUsername, ProfilePage, MyPostPage, UpdatesPage } from './pages'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Auth'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path='/' element={ <ProtectedRoute><HomePage /></ProtectedRoute> } />
            <Route path='/setname' element={ <ProtectedRoute><SetUsername /></ProtectedRoute> } />
            <Route path='/profile' element={ <ProtectedRoute><ProfilePage /></ProtectedRoute> } />
            <Route path='/my-posts' element={ <ProtectedRoute><MyPostPage /></ProtectedRoute> } />
            <Route path='/updates' element={ <UpdatesPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignUpPage /> } />
          </Routes>
        </Layout>
      </AuthProvider>
    </div>
  )
}

export default App
