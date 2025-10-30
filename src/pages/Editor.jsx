import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams  } from 'react-router-dom'
import Client from '../components/Client';
import Button from '../components/Button';
import CodeEditor from '../components/CodeEditor';
import initSocket from '../socket';
import ACTIONS from '../../Actions';
import Test from '../components/Test';
import toast from 'react-hot-toast';

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
        <div
          // initial={{ x: -24, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className='col-span-2 bg-gradient-to-b from-slate-950 via-slate-700 to-slate-800 flex flex-col justify-between max-w-screen relative overflow-hidden'
        >
            

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
              <Button cn='min-w-full text-black bg-white rounded-lg shadow-lg hover:bg-gray-200' type="button" buttonName="Copy Room ID" onClick={handleCopyRoomId}/>
            
              <Button cn='min-w-full text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg border-2 border-gray-600' type="button" buttonName="Leave" onClick={()=>{
                navigate('/');
              }} />
          
          </div>
        </div>

        <div
          className='col-span-10'
        >
          <CodeEditor socketRef={socketRef} roomId={roomId} editorRef={editorRef} viewRef={viewRef} onCodeChange={code=>codeRef.current=code}/>
        </div>
        {/* <Test/> */}
      </div>
    </div>
  )
}

export default Editor