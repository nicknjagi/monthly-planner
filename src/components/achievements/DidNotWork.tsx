import { ContentState, Editor, EditorState } from "draft-js";
import { months } from "../../utils";
import { useState } from "react";

const DidNotWork = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const DidNotWork = localStorage.getItem(`DidNotWork${months[new Date().getMonth()]}`) || "";
    const content = ContentState.createFromText(DidNotWork);
    return EditorState.createWithContent(content);
  });

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    localStorage.setItem(`DidNotWork${months[new Date().getMonth()]}`, text);
    setEditorState(editorState);
  };

  return (
    <form className="bg-white ">
      <div className="w-full max-w-5xl mx-auto">
        <h3 className="text-xl text-center font-medium underline mb-10">
          What Didn't Work
        </h3>
        <div className="grid mb-6 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[130px] overflow-y-auto leading-[42px] border-t border-[rgb(168,162,158)]">
          <Editor editorState={editorState} onChange={onChange} />
        </div>
      </div>
    </form>
  );
}
export default DidNotWork