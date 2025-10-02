import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams  } from 'react-router-dom'
import Client from '../components/Client';
import Button from '../components/Button';
import CodeEditor from '../components/CodeEditor';
import initSocket from '../socket';
import ACTIONS from '../../Actions';
import Test from '../components/Test';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Editor = () => {
  const [client, setClient] = useState([])
  const [loading, setLoading] = useState(false);  
  const editorRef = useRef(null);
  const viewRef = useRef(null);  
  const socketRef = useRef()
  const location = useLocation();
  const {username} = location.state
  const {roomId} = useParams() 
  const navigate = useNavigate();

  const codeRef = useRef(null);

  
  const init = async () => {
    
    socketRef.current = await initSocket();
   
    socketRef.current.emit(ACTIONS.JOIN, {
      roomId,
      username,
    })


    socketRef.current.on(ACTIONS.JOINED, ({clients, username, socketId})=>{
      if(location.state.username !== username){
        toast.success(`${username} joined the room.`)
      }
      setClient(clients);
      console.log(clients.length)
      if(clients.length > 1) {
        codeRef.current = editorRef.current.state.doc.toString();
      } 
      socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code: codeRef.current,
          socketId
        })
    })


    socketRef.current.on(ACTIONS.DISCONNECTED,({socketId, username})=> {
      toast.success(`${username} has left the room.`);
      setClient(prev => prev.filter(client => client.socketId !== socketId))
      
    })   

    // socketRef.current.off(ACTIONS.DISCONNECTED)

  }




  useEffect(() => {
    init();
    
    return (()=>{
      socketRef.current.disconnect();
    })
  }, [])


  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(`${roomId}`).then(()=>toast.success('Room ID copied.'))
  }

  if(loading) 
    return (<h2>Loading....</h2>);
  else
  return (
    <div className='relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.6),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.35),transparent_60%)]'>
      <div className='pointer-events-none absolute inset-0 backdrop-blur-[2px]' />

      <div className='grid grid-cols-12 h-screen'>
        <motion.aside
          initial={{ x: -24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className='col-span-2 bg-[rgba(6,8,12,0.6)] backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between max-w-screen relative overflow-hidden'
        >
          <div className='absolute -top-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl' />
          <div className='absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl' />
          <div className='pointer-events-none absolute inset-x-4 -top-10 h-20 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-2xl' />
          <div className='pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent' />

          <div>
            <div className='logo-container m-4 pb-4 border-b border-white/10'>
              <img width={120} height={100} src='/wecode_logo.png' alt='logo-we.code' className='mb-4 drop-shadow-xl' />
            </div>
            <p className='ml-4 text-base font-bold text-white/80'>Connected</p>
            <div className='flex flex-row flex-wrap gap-2 p-4'>
              {
                client?.map((client) =>
                  <Client key={client.socketId} username={client.username} />
                )
              }
            </div>
          </div>

          <div className='p-3'>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button cn='text-black bg-white/90 hover:bg-white rounded-lg shadow-md ring-1 ring-cyan-400/30' type="button" buttonName="Copy ROOM ID" onClick={handleCopyRoomId}/>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button cn='text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40' type="button" buttonName="Leave" onClick={()=>{
                // socketRef.current.disconnect();
                navigate('/');
              }} />
            </motion.div>
          </div>
        </motion.aside>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className='col-span-10 bg-black/30 backdrop-blur-2xl relative'
        >
          <div className='pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent' />
          <CodeEditor socketRef={socketRef} roomId={roomId} editorRef={editorRef} viewRef={viewRef} onCodeChange={code=>codeRef.current=code}/>
        </motion.main>
        {/* <Test/> */}
      </div>
    </div>
  )
}

export default Editor