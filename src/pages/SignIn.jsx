import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginWithGithub from '../components/LoginWithGithub';
import toast from 'react-hot-toast';


const SignIn = () => {
  
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/user/login`,{
        email,
        password
      })
      await response.data;
      // console.log(response.data);
      localStorage.setItem('token', response.data);
      setLoading(false);
      navigate('/home');
    } catch (error) {
      toast.error('Invalid credentials.')
      // console.log(error)
    }
     
    }

    








  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.6),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.35),transparent_60%)]">
      <div className="w-full max-w-sm bg-white/10 rounded-2xl shadow-xl border border-white/15 p-8 backdrop-blur-lg">
      <img width={120} height={100} src='/wecode_logo.png' alt='logo-we.code' className='fill-indigo-500 drop-shadow-lg drop-shadow-slate-200/90 mb-4 justify-self-center' />
        
        <h2 className="text-2xl font-semibold text-white/80 text-center mb-6 mt-6">Login to your account</h2>
        <form onSubmit={handleSignIn}>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            cn="p-3 outline-none rounded-lg bg-white/20 tracking-widest text-white/90 placeholder-white/60 w-full font-normal border border-white/10 focus:border-cyan-900/60 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            cn="p-3 outline-none rounded-lg bg-white/20 text-white/90 placeholder-white/60 w-full tracking-widest font-normal border border-white/10 focus:border-cyan-900/60 focus:ring-2 focus:ring-cyan-400/30 transition"
          />
          <Button 
            loading={loading}
            type="submit"
            buttonName="Sign In"
            cn="w-full text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg shadow-lg shadow-cyan-900/30 mt-4"
          />
        </form>
        <p className="mt-4 text-center text-white/70">Don't have an account?{' '}
          <span className="text-cyan-500 cursor-pointer hover:text-cyan-700" onClick={() => navigate('/signup')}>Sign up</span>
        </p>
        <p className='text-center mt-2'>OR</p>
        <LoginWithGithub />
        
      </div>
    </div>
  );
};

export default SignIn;

