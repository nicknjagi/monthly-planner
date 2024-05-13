import { ContentState, Editor, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { months } from "../utils";
import { useAppSelector } from "../hooks";

interface DayListProps {
  day: { date: number; day: string; },
  currentWeek: number
}

const DayList: React.FC<DayListProps> = ({ day, currentWeek }) => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const todos = localStorage.getItem(`todos${months[currentMonth]}${day.date}`) || "";
    const content = ContentState.createFromText(todos);
    return EditorState.createWithContent(content);
  });

  
  useEffect(() => {
    const todos = localStorage.getItem(`todos${months[currentMonth]}${day.date}`) || "";    
    const content = ContentState.createFromText(todos);
    setEditorState(EditorState.createWithContent(content)) 
  },[currentWeek, day, currentMonth])


  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`todos${months[currentMonth]}${day.date}`, text);
    setEditorState(editorState);
  };

  return (
    <form className="w-full mx-auto min-w-[300px] border border-black overflow-y-hidden bg-white">
      <h2 className="relative font-medium text-center capitalize tracking-[3px] mb-4 bg-[#F6F5F1] py-1 border-b border-black">
        <span className="absolute left-0 text-left ml-1">{day.date.toString().padStart(2,"0")}</span>{" "}
        <span>{day.day}</span>
      </h2>
      <div className="mx-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[292px] overflow-y-auto leading-[42px]">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  );
};
export default DayList;
