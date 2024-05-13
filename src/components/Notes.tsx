import { ContentState, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { months } from "../utils";
import { useAppSelector } from "../hooks";

interface NotesProps {
  currentWeek: number
} 

const Notes: React.FC<NotesProps> = ({currentWeek}) => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const notes = localStorage.getItem(`notes${months[currentMonth]}Week${currentWeek}`) || '' 
    
    const content = ContentState.createFromText(notes);
    return EditorState.createWithContent(content);
  });

  useEffect(() => {
    const notes = localStorage.getItem(`notes${months[currentMonth]}Week${currentWeek}`) || '' 
    const content = ContentState.createFromText(notes);
    setEditorState(EditorState.createWithContent(content)) 
  },[currentWeek, currentMonth])  

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`notes${months[currentMonth]}Week${currentWeek}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto">
      <h2 className=" text-3xl capitalize tracking-[3px]">Notes</h2>
      <div className="grid p-4 bg-[#F6F5F1] h-full min-h-[211px] max-h-[211px] border overflow-y-auto border-black">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  )
}
export default Notes