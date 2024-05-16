import { ContentState, Editor, EditorState } from "draft-js";
import { months } from "../../utils";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";

const DoLessOf = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const doLessOf = localStorage.getItem(`doLessOf${months[currentMonth]}`) || "";
    const content = ContentState.createFromText(doLessOf);
    return EditorState.createWithContent(content);
  });

  
  useEffect(() => {  
    const doLessOf = localStorage.getItem(`doLessOf${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(doLessOf);
    setEditorState(EditorState.createWithContent(content)) 
  }, [currentMonth]); 


  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`doLessOf${months[currentMonth]}`, text);
    setEditorState(editorState);
  };

  return (
    <form className="bg-white">
      <div className="w-full max-w-5xl mx-auto">
        <h3 className="text-xl text-center font-medium">
          do less of
        </h3>
        <div className="grid px-4 mb-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[252px] overflow-y-auto leading-[42px] border-2 border-stone-400">
          <Editor editorState={editorState} onChange={onChange} />
        </div>
      </div>
    </form>
  );
}
export default DoLessOf