import React, { useRef, useEffect } from "react";

import { EditorState, Transaction } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
import ACTIONS from "../../Actions";

const CodeEditor = ({ socketRef, editorRef, viewRef, roomId, onCodeChange }) => {


  useEffect(() => {
    
    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const isRemote = update.transactions.some(
          (tr) => tr.annotation(Transaction.userEvent) === "remote"
        );
        if (isRemote) return;

        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code: update.state.doc.toString(),
        });
      }
    });

    const startState = EditorState.create({
      doc: `function hello() {\n  console.log("Hello, world!");\n}`,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        javascript(),
        oneDark,
        updateListener,
      ],
    });

    editorRef.current = new EditorView({
      state: startState,
      parent: viewRef.current,
    });

    return () => {
      if (editorRef.current) editorRef.current.destroy();
    };
  }, []);

  useEffect(() => {
       if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        console.log('code change recieved on client:  ', code)
        editorRef.current.dispatch({
          changes: {
            from: 0,
            to: editorRef.current.state.doc.length,
            insert: code,
          },
          annotations: Transaction.userEvent.of("remote"),
        });
        
      });

    }
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);



  return (
      <div ref={viewRef}></div>
  );
};

export default CodeEditor;
