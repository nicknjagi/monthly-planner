import { ContentState, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { months } from "../utils";
import { useAppSelector } from "../hooks";

const Appointments = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const appointments = localStorage.getItem(`appointments${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(appointments);
    return EditorState.createWithContent(content);
  });
  
  
  useEffect(() => {  
    const appointments = localStorage.getItem(`appointments${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(appointments);
    setEditorState(EditorState.createWithContent(content)) 
  }, [currentMonth]); 


  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`appointments${months[currentMonth]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto max-w-3xl md:max-w-sm">
      <h2 className="text-center font-semibold tracking-[3px]">Appointments</h2>
      <div className="grid p-4 bg-white h-full min-h-[211px] max-h-[211px] border-2 overflow-y-auto border-stone-400">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default Appointments