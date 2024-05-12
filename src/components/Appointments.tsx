import { ContentState, Editor, EditorState } from "draft-js";
import { useState } from "react";
import { months } from "../utils";

const Appointments = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const appointments = localStorage.getItem(`appointments${months[new Date().getMonth()]}`) || '' 
    
    const content = ContentState.createFromText(appointments);
    return EditorState.createWithContent(content);
  });
  

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`appointments${months[new Date().getMonth()]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto max-w-md md:max-w-sm">
      <h2 className="text-center font-semibold tracking-[3px]">Appointments</h2>
      <div className="grid p-4 bg-white h-full min-h-[211px] max-h-[211px] border-2 overflow-y-auto border-stone-400">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default Appointments