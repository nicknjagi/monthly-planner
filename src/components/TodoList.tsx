import { ContentState, Editor, EditorState } from "draft-js"
import { useState } from "react";
import { months } from "../utils";

const TodoList = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const todos = localStorage.getItem(`todos${months[new Date().getMonth()]}`) || '' 
    
    const content = ContentState.createFromText(todos);
    return EditorState.createWithContent(content);
  });
  

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`todos${months[new Date().getMonth()]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto max-w-md md:max-w-lg">
      <h2 className="text-center font-semibold tracking-[3px]">TO DO LIST</h2>
      <div className="grid px-4 bg-[repeating-linear-gradient(to_bottom,_#F6F5F1,_#F6F5F1_40px,_rgb(168,162,158)_1px,_#F6F5F1_42px)] h-full min-h-[337px] md:min-h-[522px] overflow-y-hidden leading-[42px] border-y-2 border-stone-400">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default TodoList