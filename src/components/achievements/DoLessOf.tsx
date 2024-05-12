import { ContentState, Editor, EditorState } from "draft-js";
import { months } from "../../utils";
import { useState } from "react";

const DoLessOf = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const DoLessOf = localStorage.getItem(`DoLessOf${months[new Date().getMonth()]}`) || "";
    const content = ContentState.createFromText(DoLessOf);
    return EditorState.createWithContent(content);
  });

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`DoLessOf${months[new Date().getMonth()]}`, text);
    setEditorState(editorState);
  };

  return (
    <form className="bg-white">
      <div className="w-full max-w-5xl mx-auto">
        <h3 className="text-xl text-center font-medium ">
          do less of
        </h3>
        <div className="grid mb-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[252px] overflow-y-auto leading-[42px] border-l-2 border-t-2 border-black">
          <Editor editorState={editorState} onChange={onChange} />
        </div>
      </div>
    </form>
  );
}
export default DoLessOf