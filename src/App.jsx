import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { Toaster } from 'react-hot-toast'
// import Editor from './pages/Editor'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GitHubAuthSuccess from './pages/AuthSuccess'
import EditorCollab from './pages/EditorCollab'

function App() {



  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: '0.8rem', // smaller text
            padding: '6px 10px', // less padding
            minWidth: '200px',   // smaller width
          },
           success: {
            iconTheme: {
              primary: '#0a8f11'
            }
           }
        }}
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/editor/:roomId' element={<EditorCollab />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/auth/success' element={<GitHubAuthSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
