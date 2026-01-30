import { useEffect } from "react";
import { useRef } from "react";

export function ChatBox({msg, setMsg, socketRef, roomId, msgBox}) {
  
  const lastElementRef = useRef(null);

  useEffect(()=> {
    if(lastElementRef.current) {
      lastElementRef.current.scrollIntoView({behaviour: "smooth"})
    }
  }, [msgBox]);
  
  const handleSendMessage = () => {
    socketRef.current.emit('msg-sent', {
      roomId,
      msg,
      time: Date.now().toString()
    })
    setMsg("");
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  }


  
  
  return (
    <div className="flex flex-col bg-slate-900/95 backdrop-blur-sm justify-center min-h-fit p-4 rounded-xl border border-slate-700/50 shadow-2xl md:w-80 w-60">
      <div className="text-green-400 text-sm font-semibold mb-3 tracking-wide flex items-center gap-2">
        <span className="">Live Chat</span><div className="flex rounded-full md:w-[0.3rem] md:h-[0.3rem] w-1 h-1 bg-green-500 md:my-1 mt-1"></div>
      </div>

      <div className="bg-slate-800/50 md:min-h-[400px] min-h-[200px] md:max-h-[400px] max-h-[200px] rounded-lg p-3 text-xs overflow-y-auto border border-slate-700/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-3">
          {!msgBox.length ?              
             <div className="text-slate-400 md:text-sm text-[0.8rem]  max-w-fit   transition-colors fixed bottom-13 md:bottom-18 justify-self-center">no messages</div>
              :
             msgBox.map(([key, m]) =>{
              
                if(localStorage.getItem('mySocketId') === m.socketId) {
                  return (
                    <div key={key} className="flex flex-col gap-1 justify-self-end">
                      <div style={{color: m.color}} className="md:text-[0.7rem] text-[0.5rem] font-medium text-end">You</div>
                      <div className="text-slate-700 bg-slate-100 md:text-[0.8rem] text-[0.6rem] rounded-lg px-3 py-1 max-w-fit text-wrap break-words border border-slate-600/30">{m.msg}</div>
                    </div>)
                } else {
                  return (
                    <div key={key} className="flex flex-col gap-1">
                      <div style={{color: m.color}}  className="text-slate-400 md:text-[0.7rem] text-[0.5rem] font-medium">{m.userName}</div>
                      <div className="text-slate-200 bg-slate-700/60 md:text-[0.8rem] text-[0.6rem] rounded-lg px-3 py-1 max-w-fit text-wrap break-words border border-slate-600/30 hover:bg-slate-700/80 transition-colors">{m.msg}</div>
                    </div>)
                }
             }
                      
          )}
          <div ref={lastElementRef}></div>
        </div>
      </div>
      
      <div className="flex mt-4">
        <input 
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleEnter} 
          value={msg}
          placeholder="Message..." 
          type="text"
          spellCheck="false" 
          className="flex min-w-[85%] relative rounded-l-md border border-slate-600/50 bg-slate-800 md:px-3 px-2 md:py-2 py-0 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
        />
        <button 
          onClick={handleSendMessage}
          type='button' 
          className="flex relative min-w-[15%]! bg-green-500 hover:bg-green-600 text-white text-sm font-semibold md:px-3! px-2! md:py-2! py-0! rounded-r-md! rounded-l-none! transition-colors duration-200 shadow-lg hover:shadow-green-500/50"
        > 
          {"→"} 
         

        </button>
      </div>

    </div>
  );
}

export function ChatBubble() {
  return (<button className="text-center text-white bg-green-500 hover:bg-green-600 md:px-6! px-2! md:py-4! py-1! rounded-full md:text-xl! text-xs! font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-200 border border-green-400/20">
      💬 Chat
  </button>)
}