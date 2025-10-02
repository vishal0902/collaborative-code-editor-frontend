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
    <div className='grid grid-cols-12 h-screen'>


      <div className='col-span-2 bg-gray-700 flex flex-col justify-between max-w-screen'>
        <div>
            <div className='logo-container border-b border-gray-500 m-4'>
              <img width={120} height={100} src='/wecode_logo.png' alt='logo-we.code' className=' text-black mb-4 logo' />
            </div>
            <p className='ml-4 text-base font-bold'>Connected</p>
            <div className='flex flex-row flex-wrap gap-2'>
              {
                client?.map((client) =>
                  <Client key={client.socketId} username={client.username} />
                )
              }
            </div>
        </div>

        <div>
          <Button cn='text-black bg-white' type="button" buttonName="Copy ROOM ID" onClick={handleCopyRoomId}/>
          <Button cn='text-white bg-purple-900' type="button" buttonName="Leave" onClick={()=>{
            // socketRef.current.disconnect();
            navigate('/');
          }} />
        </div>
      </div>

      <div className='col-span-10 bg-gray-800'>
          <CodeEditor socketRef={socketRef} roomId={roomId} editorRef={editorRef} viewRef={viewRef} onCodeChange={code=>codeRef.current=code}/>
      </div>
              {/* <Test/> */}
    </div>
  )
}

export default Editor