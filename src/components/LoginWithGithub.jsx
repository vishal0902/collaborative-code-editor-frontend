import Button from './Button'

function LoginWithGithub() {
  return (
    <button 
            type="button"
            className="flex justify-center items-center  w-full  text-black bg-green-600/90 rounded-lg shadow-lg shadow-cyan-900/30 mt-4 transition-opacity duration-1000 ease-linear
               hover:opacity-80"
            onClick={()=>window.location.href = `http://localhost:4000/auth/github`}
    >
    Continue with &nbsp; <img className='size-7 bg-green-600/90 ' src='github-icon.png'/>
    </button>
  )
}

export default LoginWithGithub