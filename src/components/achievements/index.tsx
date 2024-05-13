import { ContentState, Editor, EditorState } from "draft-js"
import { months } from "../../utils"
import { useEffect, useState } from "react";
import Worked from "./Worked";
import DidNotWork from "./DidNotWork";
import DoMoreOf from "./DoMoreOf";
import DoLessOf from "./DoLessOf";
import { useAppSelector } from "../../hooks";

const Achievements = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const achievements = localStorage.getItem(`achievements${months[currentMonth]}`) || "";
    const content = ContentState.createFromText(achievements);
    return EditorState.createWithContent(content);
  });


  useEffect(() => {  
    const achievements = localStorage.getItem(`achievements${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(achievements);
    setEditorState(EditorState.createWithContent(content)) 
  }, [currentMonth]); 


  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`achievements${months[currentMonth]}`, text);
    setEditorState(editorState);
  };

  return (
    <section className="bg-white px-4 md:px-8 pb-20">
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-4xl text-center mb-6">
          {months[currentMonth]} Achievements
        </h2>
        <div className="grid mb-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[380px] overflow-y-auto leading-[42px] border-t border-[rgb(168,162,158)]">
          <Editor editorState={editorState} onChange={onChange} />
        </div>
        <Worked />
        <DidNotWork />   
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <DoMoreOf />
          <DoLessOf />  
        </div>    
      </div>
    </section>
  );
}
export default Achievements