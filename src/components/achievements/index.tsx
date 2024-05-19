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
    <section className="bg-white px-4 md:px-8 py-8">
      <div className="w-full max-w-[960px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <img
            className="w-28 md:w-40 h-fit aspect-[3/2] -translate-x-2 md:-translate-x-6"
            src="./assets/images/logo.png"
            alt="logo"
          />
          <h2 className="text-2xl md:text-4xl text-center">
            {months[currentMonth]} Achievements
          </h2>
        </div>
        <div className="grid px-4 mb-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[379px] overflow-y-auto leading-[42px] border-t-2 border-x-2 border-stone-400">
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