import { ContentState, Editor, EditorState } from "draft-js";
import { useState } from "react";
import { months } from "../utils";

const Reminders = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const reminders = localStorage.getItem(`reminders${months[new Date().getMonth()]}`) || '' 
    
    const content = ContentState.createFromText(reminders);
    return EditorState.createWithContent(content);
  });
  

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`reminders${months[new Date().getMonth()]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto max-w-md md:max-w-sm">
      <h2 className="text-center font-semibold tracking-[3px]">reminders</h2>
      <div className="grid p-4 bg-white h-full min-h-[211px] max-h-[211px] overflow-y-auto border-2 border-stone-400"> 
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default Reminders