import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] =  useState({})


  useEffect(() => {
    // console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token')=== null) {navigate('/signin'); return;}
    
    axios.get(`${import.meta.env.VITE_BACKEND_URL}api/me`, { withCredentials: true, headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    } })
      .then(res => {
        if(res.status == 200){
          // console.log(res.data)
          setUser(res.data.user); 
          setUsername(res.data.user.name)
        } else {
          navigate('/');
        }

        })
      .catch(err=>navigate('/'))
      .finally(() => {
      });
  }, []);


  const generateUid = (e) => {
    e.preventDefault();
    setRoomId(uuid());
    toast.success("Created a new room.");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID and Username required.");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
        avatar: user.avatar
      },
    });
  };

  const handleEnterPressed = (e) => {

    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.6),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.35),transparent_60%)]">
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />

      <div className="flex items-center justify-center min-h-screen px-4">
      <Button
          cn="absolute top-6 left-6 text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40"
          type="button"
          buttonName="Logout"
          onClick={() => {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/logout`, { }, { withCredentials: true }).then(res => {
              if(res.status === 204){
                toast.success("Logged out successfully.");
              }
            })
            localStorage.removeItem('token');
            navigate('/')
            }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-br from-white/25 via-cyan-300/20 to-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="rounded-2xl bg-[rgba(6,8,12,0.6)] backdrop-blur-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-6 -top-10 h-24 bg-gradient-to-b from-white/25 to-transparent rounded-full blur-2xl" />
            <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <div className="relative px-8 pt-10 pb-6">
              <div className="logo-container flex justify-center">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  width={120}
                  height={100}
                  src="/wecode_logo.png"
                  alt="logo-we.code"
                  className="mb-4 drop-shadow-xl"
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="mt-2 text-center text-xl font-semibold tracking-tight text-white/90"
              >
                Paste invitation Room ID
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.35 }}
              >
                <Input
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyUp={handleEnterPressed}
                  type="text"
                  placeholder="Room ID"
                  cn="tracking-widest font-normal p-3 outline-none rounded-lg bg-white/10 text-white/90 placeholder-white/50 w-full font-medium border border-white/10 shadow-inner shadow-black/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30 transition"
                />
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyUp={handleEnterPressed}
                  type="text"
                  placeholder="Username"
                  cn="tracking-widest font-normal p-3 outline-none rounded-lg bg-white/10 text-white/90 placeholder-white/50 w-full font-medium border border-white/10 shadow-inner shadow-black/30 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/30 transition"
                />
              </motion.div>

              <div className="flex justify-end">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    cn="text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40"
                    type="button"
                    buttonName="Join Room"
                    onClick={joinRoom}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.35 }}
                className="flex justify-center my-4"
              >
                <p className="text-xs text-white/70">
                  If you don't have an invite, then create a{" "}
                  <a
                    href=""
                    onClick={generateUid}
                    className="lg:text-base text-xs  text-cyan-300 no-underline cursor-pointer hover:text-cyan-200"
                  >
                    new room
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
