import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Editor from './pages/Editor'
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
