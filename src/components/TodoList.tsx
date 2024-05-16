import { ContentState, Editor, EditorState } from "draft-js"
import { useEffect, useState } from "react";
import { months } from "../utils";
import { useAppSelector } from "../hooks";

const TodoList = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const todos = localStorage.getItem(`todos${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(todos);
    return EditorState.createWithContent(content);
  });

  
  useEffect(() => {  
    const todos = localStorage.getItem(`todos${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(todos);
    setEditorState(EditorState.createWithContent(content)) 
  }, [currentMonth]); 
  

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`todos${months[currentMonth]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto max-w-3xl md:max-w-lg">
      <h2 className="text-center font-semibold tracking-[3px]">TO DO LIST</h2>
      <div className="grid px-4 bg-[repeating-linear-gradient(to_bottom,_#F6F5F1,_#F6F5F1_40px,_rgb(168,162,158)_1px,_#F6F5F1_42px)] h-full min-h-[337px]  md:min-h-[460px] overflow-y-auto leading-[42px] border-2 border-stone-400">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default TodoList