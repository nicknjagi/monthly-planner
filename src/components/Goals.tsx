import { useEffect, useState } from "react"
import {Editor, EditorState,ContentState, SelectionState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Modifier } from 'draft-js';
import { months } from "../utils";
import { useAppSelector } from "../hooks";

interface MyEditorProps {}

// interface MyEditorState {
//   editorState: EditorState;
// }

const Goals: React.FC<MyEditorProps> = () => {
  const {currentMonth} = useAppSelector(state => state.date)
  const [editorState, setEditorState] = useState<EditorState>(() => {
    const goals = localStorage.getItem(`goals${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(goals);
    return EditorState.createWithContent(content);
  })


  useEffect(() => {
    const goals = localStorage.getItem(`goals${months[currentMonth]}`) || '' 
    const content = ContentState.createFromText(goals);
    const newEditorState = setBlockTypeToUnorderedList(EditorState.createWithContent(content));
    setEditorState(newEditorState) 
  }, [currentMonth]); 


  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    
    localStorage.setItem(`goals${months[currentMonth]}`, text)
    setEditorState(editorState);
  };

  return (
    <form className="grid w-full mx-auto max-w-3xl md:max-w-lg ">
      <h2 className="text-center font-semibold tracking-[3px]">GOALS</h2>
      <div className="grid px-4 bg-[repeating-linear-gradient(to_bottom,_white,_white_40px,_rgb(168,162,158)_1px,_white_42px)] break-words h-full min-h-[208px] md:min-h-[253px] overflow-y-hidden leading-[42px] border-2 border-stone-400">
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
