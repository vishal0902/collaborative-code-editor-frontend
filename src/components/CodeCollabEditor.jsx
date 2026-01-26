import React, { useEffect } from "react";
import { EditorState, Transaction } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import ACTIONS from "../../Actions";
import * as Y from 'yjs'
import { yCollab } from "y-codemirror.next";

const CodeCollabEditor = ({ socketRef, editorRef, roomId, setClientCode, username, avatar }) => {



  useEffect(() => {

    //

    if(!socketRef.current) return;

    const ydoc = new Y.Doc()

    const yText = ydoc.getText("code")


    socketRef.current.emit(ACTIONS.JOIN, {roomId, username, avatar})


    ydoc.on("update", (update) => {
      setClientCode(yText.toString())
      
      if (origin !== "remote") {
        socketRef.current.emit(ACTIONS.YJS_CODE_UPDATE, {
        roomId,
        update: Array.from(update) // serialize safely
      })
    }
    })

  
    socketRef.current.on(ACTIONS.YJS_SYNC_CODE, state => {
      Y.applyUpdate(ydoc, new Uint8Array(state), "remote")
    })

    socketRef.current.on(ACTIONS.YJS_CODE_UPDATE, update => {
      Y.applyUpdate(ydoc, new Uint8Array(update), "remote")
    })

      const state = EditorState.create({
      doc: yText.toString() || "console.log('hello! Javascript.')".toString(),
      extensions: [
        basicSetup,
        oneDark,
        keymap.of([defaultKeymap,indentWithTab]),
        javascript(),
        yCollab(yText)
      ]
    })


    const view = new EditorView({
      state,
      parent: editorRef.current
    })

    const socket = socketRef.current;

    return () => {
      socket.off(ACTIONS.YJS_CODE_UPDATE)
      view.destroy()
      ydoc.destroy()
    }
  }, [roomId])


  return (<>
       <div ref={editorRef} style={{ minHeight: "90vh", width: "100vw", fontSize:"20px" }} />

  </>
  );
};

export default CodeCollabEditor;
