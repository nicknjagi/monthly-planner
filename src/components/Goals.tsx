import { useEffect, useState } from "react"
import {Editor, EditorState,ContentState, SelectionState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Modifier } from 'draft-js';
import { months } from "../utils";

interface MyEditorProps {}

// interface MyEditorState {
//   editorState: EditorState;
// }

const Goals: React.FC<MyEditorProps> = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const goals = localStorage.getItem(`goals${months[new Date().getMonth()]}`) || '' 
    
    const content = ContentState.createFromText(goals);
    return EditorState.createWithContent(content);
  })
  useEffect(() => {
    const newEditorState = setBlockTypeToUnorderedList(editorState);
    setEditorState(newEditorState);
  }, []); 

  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`goals${months[new Date().getMonth()]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="grid w-full mx-auto max-w-md md:max-w-lg ">
      <h2 className="text-center font-semibold tracking-[3px]">GOALS</h2>
      <div className="grid px-4 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] h-full min-h-[211px] md:min-h-[253px] overflow-y-hidden leading-[42px] border-2 border-stone-400">
        <Editor editorState={editorState} onChange={onChange} />
      </div>
    </form>
  );
}
export default Goals

function setBlockTypeToUnorderedList(editorState: EditorState): EditorState {
  const contentState = editorState.getCurrentContent();
  const firstBlockKey = contentState.getFirstBlock().getKey();
  const lastBlockKey = contentState.getLastBlock().getKey();
  const selectionState = SelectionState.createEmpty(firstBlockKey).merge({
    anchorOffset: 0,
    focusKey: lastBlockKey,
    focusOffset: contentState.getBlockForKey(lastBlockKey).getLength(),
  });

  const newContentState = Modifier.setBlockType(contentState, selectionState, 'unordered-list-item');
  const newEditorState = EditorState.push(editorState, newContentState, 'change-block-type');

  return newEditorState;
}
