import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Client from "../components/Client";
import Button from "../components/Button";
import {Spinner} from "../components/Spinner"
// import CodeEditor from "../components/CodeEditor";
import initSocket  from "../socket";
import ACTIONS from "../../Actions";
// import Test from "../components/Test";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { handleRunCode } from "../utils/runCodeSnippet";
// import { language } from "@codemirror/language";
import CodeCollabEditor from "../components/CodeCollabEditor";
import * as Y from 'yjs'
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from 'y-protocols/awareness.js'
import { EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { indentWithTab } from "@codemirror/commands";
import { keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { yCollab } from "y-codemirror.next";
import { EditorView } from "@codemirror/view";
import ClientSelf from "../components/CleintSelf";

const EditorCollab = () => {
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const socketRef = useRef();

  const location = useLocation();
  const { username, avatar } = location.state;
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [output, setOutput] = useState(null);
  const [codeRunStatus, setCodeRunStatus] = useState(null);

  const [showOutputSection, setShowOutputSection] = useState(false);

  const [clientCode, setClientCode] = useState("");

  const [codeLanguage, setCodeLanguage] = useState("javascript");


  
  useEffect(()=>{
    
    socketRef.current = initSocket();
    
    const ydoc = new Y.Doc()

    const yText = ydoc.getText("code")


    /////////Cursor/////////
    const awareness = new Awareness(ydoc)

    awareness.setLocalStateField("user", {
      name: username,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    })

    /////////Cursor End/////////


    socketRef.current.emit("join-room",{
      roomId,
      username,
      avatar
    })

    ydoc.on("update", (update) => {
      
      setClientCode(yText.toString())
      
      if (origin !== "remote") {
        socketRef.current.emit("yjs-update", {
          roomId,
          update: Array.from(update) // serialize safely
      })
    }
    })

    // Awareness sync
    awareness.on("update", ({ added, updated, removed }) => {
    const changedClients = added.concat(updated).concat(removed)

    const awarenessUpdate = encodeAwarenessUpdate(
      awareness,
      changedClients
    )

    socketRef.current.emit("awareness-update", {
      roomId,
      update: Array.from(awarenessUpdate)
    })
    })

    socketRef.current.on("awareness-update", update => {
      applyAwarenessUpdate(
        awareness,
        new Uint8Array(update),
        "remote"
      )
    })



    // Awareness sync end

    socketRef.current.on("yjs-sync", state => {
      Y.applyUpdate(ydoc, new Uint8Array(state), "remote")
    })


    socketRef.current.on("yjs-update", update => {
      Y.applyUpdate(ydoc, new Uint8Array(update), "remote")
    })


    socketRef.current.on("save-soketId", ({userSocketId})=> {
      localStorage.setItem('mySocketId', userSocketId )
    })

    socketRef.current.on(ACTIONS.JOINED, ({ clients, username }) => {
      // console.log(username, clients, location.state.username);
      
      if (location.state.username !== username) {
        toast.success(`${username} joined the room.`);
      } 
      
      setClient(clients);
    
    });

    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      toast.success(`${username} has left the room.`);
      setClient((prev) =>
        prev.filter((client) => client.socketId !== socketId)
      );
    });

   

    socketRef.current.on(
      ACTIONS.CODE_RUNNING,
      ({ username, showOutputSection, runStatus, data }) => {
        if(username !== location.state.username) toast.success(`${username} is running the code.`)
        setShowOutputSection(showOutputSection);
        setCodeRunStatus(runStatus);
        setOutput(data);
      }
    );

    socketRef.current.on(
      ACTIONS.CODE_COMPLETED,
      ({ runStatus, data }) => {
        // setShowOutputSection(showOutputSection);
        setCodeRunStatus(runStatus);
        setOutput(data);
      }
    );


    socketRef.current.on(ACTIONS.CLOSE_TERMINAL, ({ showOutputSection }) => {
      setShowOutputSection(showOutputSection);
    });

    socketRef.current.on(
      ACTIONS.CHANGE_LANGUAGE,
      ({ languageMode, username }) => {
        if(username !== location.state.username) toast.success(`${username} switched language to ${languageMode}`);
        setCodeLanguage(languageMode);
      }
    );

     //Codemirror  

     const state = EditorState.create({
        doc: yText.toString(),
        extensions: [
          basicSetup,
          oneDark,
          keymap.of([defaultKeymap,indentWithTab]),
          javascript(),
          yCollab(yText, awareness)
          ]
      })

    const view = new EditorView({
      state,
      parent: editorRef.current
    })

    return ()=>{
      socketRef.current.disconnect()
      socketRef.current.off("yjs-update")
      socketRef.current.off("yjs-sync")
      socketRef.current.off("awareness-update")
      view.destroy();
      ydoc.destroy();
    }

  },[roomId])
  
  
  // useEffect(() => {
    
  // }, [roomId]);

  const handleCopyRoomId = () => {
    navigator.clipboard
      .writeText(`${roomId}`)
      .then(() => toast.success("Room ID copied."));
  };

  if (loading) return <h2>Loading....</h2>;
  else
    return (
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(2,6,23,0.6),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(8,47,73,0.35),transparent_60%)]">
        <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />

        <div className="grid grid-cols-12 h-screen">
          {/* Aside section start */}
          <div className="col-span-2 bg-gradient-to-b from-slate-950 via-slate-700 to-slate-800 flex flex-col justify-between max-w-screen relative overflow-hidden">
            <div>
              <div className="logo-container m-4 pb-4 border-b border-white/10">
                <img
                  width={120}
                  height={100}
                  src="/wecode_logo.png"
                  alt="logo-we.code"
                  className="mb-4 drop-shadow-xl"
                />
              </div>
              <p className="m-2 text-base font-semibold text-white/80">
                Connected{" "}
              </p>
              <div className="flex flex-row flex-wrap gap-2 p-2">
                <ClientSelf username={location.state.username} avatar={location.state.avatar} />
                {client?.filter(c => c.socketId !== localStorage.getItem("mySocketId")).map((client) => (
                  <Client
                    localUser={location.state.username}
                    key={client.socketId}
                    username={client.username}
                    avatar={client.avatar}
                  />
                ))}
              </div>
            </div>

            <div className="p-3">
              <Button
                cn="min-w-full text-black bg-white rounded-lg shadow-lg hover:bg-gray-200"
                type="button"
                buttonName="Copy Room ID"
                onClick={handleCopyRoomId}
              />

              <Button
                cn="min-w-full text-white bg-gradient-to-r from-slate-950 to-slate-800 hover:from-slate-900 hover:to-slate-700 rounded-lg border-2 border-gray-600"
                type="button"
                buttonName="Leave"
                onClick={() => {
                  localStorage.removeItem("mySocketId");
                  navigate("/home",{replace: true});
                }}
              />
            </div>
          </div>

          {/* Aside section end */}

          <div className="relative max-h-screen col-span-10 bg-gray-100/10">
            <div className="w-full relative bg-gray-900/10 flex justify-between pt-1">
              <select
                value={codeLanguage}
                onChange={(e) => {
                  socketRef.current.emit(ACTIONS.CHANGE_LANGUAGE, {
                    roomId,
                    languageMode: e.target.value,
                  });
                }}
                className="cursor-pointer font-mono appearance-none pl-4 pr-8 bg-slate-700/50 text-white/80 border-1 border-slate-700 rounded-sm m-1"
                name="pets"
                id="language-select"
              >
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
              <span className="absolute text-xs/tight left-30 top-3/10 text-gray-400">
                ▼
              </span>{" "}
                <div className="mt-1.5 flex gap-5">
                  <span className=" fill-yellow-500 drop-shadow-sm drop-shadow-white/90">Language Mode : </span> 
                  <span className="text-green-500 fill-yellow-500 drop-shadow-lg drop-shadow-slate-100/90">{codeLanguage} </span> 
                    <span className=""><motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="relative px-3 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-300"
                      >
                        ● Live: {client.length} {client.length === 1 ? <span>collaborator</span> : <span>collaborators</span>} 
                    </motion.div></span>
                </div>
              <div>
                <div className="">
                  <button
                    onClick={async () => {
                      // setShowOutputSection(true);
                      socketRef.current.emit(ACTIONS.CODE_RUNNING, {
                        username,
                        showOutputSection: true,
                        roomId,
                        runStatus: "running",
                        data: null,
                      });

                      // console.log(await handleRunCode(clientCode, codeLanguage))
                      handleRunCode(clientCode, codeLanguage).then((data) => {
                        socketRef.current.emit(ACTIONS.CODE_COMPLETED, {
                          // showOutputSection: true,
                          roomId,
                          runStatus: "completed",
                          data,
                        });
                      });
                    }}
                    className="m-1 bg-green-500/90 hover:opacity-50 text-sm text-white min-w-[6vw] py-[2px]! rounded-sm!"
                  >
                    Run
                  </button>
                </div>
              </div>
            </div>
            <div ref={editorRef} style={{height:'100vh', width:'100vw' }}></div>

            
            {showOutputSection && (
              <div className="absolute w-full bottom-0 bg-slate-800 text-white font-mono max-h-[20vh] min-h-[20vh] border-t-2 border-green-400/80">
                <div className=" m-2 ">
                  {codeRunStatus && (
                    <div>
                      <div className=" text-white/50 w-full ">
                        {output?.stderr ? (
                          <span className="border-b">Problem</span>
                        ) : (
                          <span className="border-b">Output</span>
                        )}
                      </div>
                      <div className="w-auto overflow-y-scroll max-h-[15vh] min-h-[15vh] ">
                        {codeRunStatus === "running" ? (
                          <div className="flex">Code running...&nbsp;<span className="mt-1.5"> <Spinner /> </span></div>
                        ) : (
                          <div>
                            {output.stderr || output.stdout === null
                              ? output.stderr
                              : output.stdout
                                  .split("\n")
                                  .map((str, index) => (
                                    <div key={index} className="m-0! ">{str}</div>
                                  ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div
                    onClick={() => {
                      socketRef.current.emit(ACTIONS.CLOSE_TERMINAL, {
                        roomId,
                        showOutputSection: false,
                      });
                    }}
                    className="bg-slate-800 hover:bg-slate-600 text-white absolute top-1 right-1 cursor-pointer border-1 border-gray-500 px-4 rounded-sm "
                  >
                    {" "}
                    x{" "}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <Test/> */}
        </div>
      </div>
    );
};

export default EditorCollab;
