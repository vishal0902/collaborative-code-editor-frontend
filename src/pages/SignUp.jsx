import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import {z} from 'zod'
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import LoginWithGithub from '../components/LoginWithGithub';

const SignUp = () => {
  
  const UserSchema = z.object({
    name: z.string().min(3, 'name should be at least 3 characters long.'),
    email: z.email('Not a valid email address.'),
    password: z.string().min(6, 'Password should be at least 6 characters long.'),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {message: 'Passwords do not match.', path:["confirmPassword"]})

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErroMsg] = useState({
    nameError : "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: ""
  })
  


  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = UserSchema.safeParse({name, email, password, confirmPassword})
    if(!res.success){
      // console.log(res.error.issues.map(issue=>({path: issue.path ,message: issue.message})))
      res.error.issues.map(issue => {
        switch(issue.path[0]) {
          case 'name':
            setErroMsg(prev => ({...prev, nameError: issue.message}))
            break;
          case 'email':
            setErroMsg(prev => ({...prev, emailError: issue.message }))
            break;
          case 'password':
            setErroMsg(prev => ({...prev, passwordError: issue.message}))
            break;
          case 'confirmPassword':
            setErroMsg(prev => ({...prev, confirmPasswordError: issue.message}))
            break;
          default: return;
        }
      })

    } else{
          try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/user/register`,{
              name,
              email,
              password
            })
            console.log(response.data)
            localStorage.setItem('token', response.data)
            navigate('/home')
        } catch (error) {
          console.log(error)
        } 
    
      return;
    }
    



    // console.log({email, username, password});

  

    // if(!response.data) {
    //     console.log('some error occured', response.error.message);
    //     return;
    // } 

    // navigate('/');


    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.6),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.35),transparent_60%)]">
      <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-xl border border-white/15 p-8 backdrop-blur-lg">
      <img width={120} height={100} src='/wecode_logo.png' alt='logo-we.code' className='fill-indigo-500 drop-shadow-lg drop-shadow-slate-200/90 mb-4 justify-self-center' />
        <h2 className="text-xl font-semibold text-white/90 text mb-4 mt-6 justify-self-center">Create a new account</h2>
        <form onSubmit={handleSignUp}>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            cn="px-2 py-2 outline-none rounded-lg bg-gray-800/20 text-white/90 placeholder-white/60 min-w-full border border-white/10 focus:border-cyan-800/90 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          {errorMsg.emailError && <ErrorMessage errorMessage={errorMsg.emailError}/>}

          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            cn="px-2 py-2 outline-none rounded-lg bg-gray-800/20  text-white/90 placeholder-white/60 min-w-full border border-white/10 focus:border-cyan-800/90 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          {errorMsg.nameError && <ErrorMessage errorMessage={errorMsg.nameError}/>}


          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            cn="px-2 py-2 outline-none rounded-lg bg-gray-800/20  text-white/90 placeholder-white/60 min-w-full border border-white/10 focus:border-cyan-900/90 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          {errorMsg.passwordError && <ErrorMessage errorMessage={errorMsg.passwordError}/>}

          <Input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            cn="px-2 py-2 outline-none rounded-lg bg-gray-800/20  text-white/90 placeholder-white/60 min-w-full border border-white/10 focus:border-cyan-900/60 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          {errorMsg.confirmPasswordError && <ErrorMessage errorMessage={errorMsg.confirmPasswordError}/>}

          <Button 
            type="submit"
            buttonName="Sign Up"
            cn="w-full text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg shadow-lg shadow-cyan-900/30 mt-4"
            onClick={handleSignUp}

          />
        </form>
        <p className="mt-4 text-center text-white/70">Already have an account?{' '}
          <span className="text-cyan-300 cursor-pointer hover:text-cyan-200" onClick={() => navigate('/signin')}>Sign in</span>
        </p>
        <p className='text-center mt-2'>OR</p>
        <LoginWithGithub />
      </div>
    </div>
  );
};

export default SignUp;
