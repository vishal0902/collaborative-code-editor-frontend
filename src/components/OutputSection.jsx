import React from "react";
import ACTIONS from "../../Actions";
import { Spinner } from "./Spinner";
export function OutputSection({
  codeRunStatus,
  output,
  socketRef,
  roomId
}) {
  return <div className="absolute bottom-0 bg-gradient-to-t from-slate-900 to-slate-800 text-white font-mono max-h-[20vh] min-h-[20vh] border-t-2 border-green-500/40 shadow-2xl w-[100%]">
                <div className="flex flex-col h-full">
                  {
        /* Header */
      }
                  <div className="flex items-center px-4 py-3 border-b  border-slate-700/50">
                    <div className="flex items-center gap-2">
                      {codeRunStatus === "running" ? <>
                          <span className="text-yellow-400">⚙️</span>
                          <span className="text-sm font-semibold text-yellow-300">Executing Code</span>
                        </> : output?.stderr ? <>
                          <span className="text-red-400">⚠️</span>
                          <span className="text-sm font-semibold text-red-300">Error Output</span>
                        </> : <>
                          <span className="text-green-400">✓</span>
                          <span className="text-sm font-semibold text-green-300">Program Output</span>
                        </>}
                    </div>
                    <button onClick={() => {
          socketRef.current.emit(ACTIONS.CLOSE_TERMINAL, {
            roomId,
            showOutputSection: false
          });
        }} className="flex fixed right-3 items-center justify-center w-7 h-7 pb-[0.9rem]! px-[1rem]! text-xl!  rounded-md bg-slate-700/50 hover:bg-red-500/30 text-slate-300 hover:text-red-400 border border-slate-600/50 hover:border-red-500/50">
                      x
                    </button>
                  </div>

                  {
        /* Output Content */
      }
                  <div className="flex-1 w-auto overflow-y-scroll max-h-[15vh] min-h-[15vh] px-4 py-2 bg-slate-900/40">
                    {codeRunStatus === "running" ? <div className="flex items-center gap-4 text-slate-300 py-2">
                        <span className="text-lg"><Spinner /></span>
                        <span className="text-sm font-medium">Code is executing...</span>
                      </div> : codeRunStatus === "completed" ? <div className="space-y-0 mt-2">
                        {output?.stderr || output?.stdout === null ? <div className="text-red-300/90 text-xs leading-relaxed whitespace-pre-wrap break-words">
                            {output.stderr}
                          </div> : output?.stdout ? <div className="text-green-300/90 text-xs leading-relaxed whitespace-pre-wrap break-words">
                            {output.stdout.split("\n").map((str, index) => <div key={index} className="hover:bg-slate-700/20 px-1">
                                {str}
                              </div>)}
                          </div> : <div className="text-slate-400 text-xs italic py-4">
                            No output received
                          </div>}
                      </div> : null}
                  </div>
                </div>
              </div>;
}
  