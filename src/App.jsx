import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Editor from './pages/Editor'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GitHubAuthSuccess from './pages/AuthSuccess'
// import { useState } from 'react'

function App() {



  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
           success: {
            iconTheme: {
              primary: '#59168b'
            }
           }
        }}
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<Editor />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/auth/success' element={<GitHubAuthSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
