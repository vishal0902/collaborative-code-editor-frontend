import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams  } from 'react-router-dom'
import Client from '../components/Client';
import Button from '../components/Button';
import CodeEditor from '../components/CodeEditor';
import initSocket from '../socket';
import ACTIONS from '../../Actions';
import Test from '../components/Test';
import toast from 'react-hot-toast';
import { handleRunCode } from '../utils/runCodeSnippet';
import { language } from '@codemirror/language';

const Editor = () => {
  const [client, setClient] = useState([])
  const [loading, setLoading] = useState(false);  
  const editorRef = useRef(null);

  const viewRef = useRef(null);  
  const socketRef = useRef()
  const codeRef = useRef(null);
  
  const location = useLocation();
  const {username, avatar} = location.state
  const {roomId} = useParams() 
  const navigate = useNavigate();

  const [output, setOutput] = useState(null)
  const [codeRunStatus, setCodeRunStatus] = useState(null)

  const [showOutputSection, setShowOutputSection] = useState(false);

  const [clientCode, setClientCode] = useState('')

  const [codeLanguage, setCodeLanguage] = useState('javascript');
  



  
  const init = async () => {
    
    socketRef.current = await initSocket();
   
    socketRef.current.emit(ACTIONS.JOIN, {
      roomId,
      username,
      avatar
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

    socketRef.current.on(ACTIONS.DISCONNECTED,({socketId, username})=> {
      toast.success(`${username} has left the room.`);
      setClient(prev => prev.filter(client => client.socketId !== socketId))
      
    })

    socketRef.current.on(ACTIONS.CODE_RUN_STATUS,({showOutputSection, runStatus, data})=> {
      setShowOutputSection(showOutputSection)
      setCodeRunStatus(runStatus); 
      setOutput(data)     
    })

    socketRef.current.on(ACTIONS.CLOSE_TERMINAL, ({showOutputSection}) => {
      setShowOutputSection(showOutputSection);
    });

    

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
        {/* Aside section start */}
        <div className='col-span-2 bg-gradient-to-b from-slate-950 via-slate-700 to-slate-800 flex flex-col justify-between max-w-screen relative overflow-hidden'
        >
            

          <div>
            <div className='logo-container m-4 pb-4 border-b border-white/10'>
              <img width={120} height={100} src='/wecode_logo.png' alt='logo-we.code' className='mb-4 drop-shadow-xl' />
            </div>
            <p className='m-2 text-base font-semibold text-white/80'>Connected </p>
            <div className='flex flex-row flex-wrap gap-2 p-2'>
              {
                client?.map((client) =>
                  <Client key={client.socketId} username={client.username} avatar={client.avatar} />
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

        {/* Aside section end */}

        
        <div className='relative max-h-screen col-span-10 bg-gray-100/10'>
              <div className='w-full relative bg-gray-900/10 flex justify-between'>
             
                    <select onChange={e=>setCodeLanguage(e.target.value)} className= 'cursor-pointer appearance-none pl-4 pr-8 bg-slate-700/50 text-white/80 border-1 border-slate-700 rounded-sm m-1' name="pets" id="language-select">
                      <option value="javascript" >Javascript  </option>
                      <option value="python">Python</option>
                      {/* <option value="java">Java</option> */}
                      <option value="cpp">C++</option>
                    </select>
                    <span className='size-0 absolute left-25 top-2/10 text-gray-400  '>▼</span> {codeLanguage}
                    {/* <div class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      ▼
                    </div> */}
                
                <div>
                  {/* <button type='button'>Run</button> */}
                  <div className=''><button onClick={ async ()=>{
                // setShowOutputSection(true);
                socketRef.current.emit(ACTIONS.CODE_RUN_STATUS,{
                  showOutputSection: true,
                  roomId,
                  runStatus: 'running', 
                  data: null,                 
                })

                // console.log(await handleRunCode(clientCode, codeLanguage))
                handleRunCode(clientCode, codeLanguage).then((data) => { 
                  socketRef.current.emit(ACTIONS.CODE_RUN_STATUS,{
                  showOutputSection: true,
                  roomId,
                  runStatus: 'completed',
                  data                  
                  })
                })


              }} className='m-1 bg-green-500/90 hover:opacity-50 text-sm text-white min-w-[6vw] py-[2px]! rounded-sm!'>Run</button></div>
            
                </div>
              </div>
            <CodeEditor setClientCode={setClientCode} userName = {location.state.username} socketRef={socketRef} roomId={roomId} editorRef={editorRef} viewRef={viewRef} onCodeChange={code=>codeRef.current=code}/>
            
            {
              showOutputSection &&
              <div className='absolute w-full bottom-0 bg-slate-800 text-white font-mono max-h-[20vh] min-h-[20vh] '>
              <div className=' m-2 '>
                {codeRunStatus && 
                <div>
                  <p className='border-b text-white/50 w-full '>Output</p>
                  <div className='w-auto overflow-y-scroll max-h-[15vh] min-h-[15vh] '>{codeRunStatus === 'running' ? <p>Code running...</p> : <p>{output.stderr ? output.stderr : output.stdout.split("\n").map(str =><p className='m-0! '>{str}</p>)}</p>}</div>
                </div>}
                <p  onClick={()=>{
                  socketRef.current.emit(ACTIONS.CLOSE_TERMINAL, ({
                    roomId,
                    showOutputSection: false
                  }))
                }} className='bg-slate-800 hover:bg-slate-600 text-white absolute top-1 right-1 cursor-pointer border-1 border-gray-500 px-4 rounded-sm '> x </p>
              </div>
            </div>
             }
            

        </div>
        {/* <Test/> */}
      </div>
    </div>
  )
}

export default Editor