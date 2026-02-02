import { useRef, useState } from 'react'

function LoginWithGithub() {
  const [loading, setLoading] = useState(false);
  const btnRef = useRef();
  return (
    <button 
            ref={btnRef}
            type="button"
            className="flex justify-center items-center  w-full  text-black bg-green-600/90 rounded-lg shadow-lg shadow-cyan-900/30 mt-4 transition-opacity duration-1000 ease-linear
               hover:opacity-80"
            onClick={()=>{
                  setLoading(true);
                  window.location.href = `${import.meta.env.VITE_BACKEND_URL}auth/github`
                }
              }
    >
    {!loading ? <span className='flex'>Continue with &nbsp;<img className='size-6' src='github-icon.png'/></span>: <img src='./loading.svg' className='size-6'/> }
    
    </button>
  )
}

export default LoginWithGithub