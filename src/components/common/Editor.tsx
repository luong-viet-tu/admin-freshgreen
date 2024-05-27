import { memo } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

interface Props {
  content: string;
  setContent: (content: string) => void;
}

const Editor = memo((props: Props) => {
  const handleChangeInput = (e: any) => {
    props.setContent(e);
  };

  return (
    <SunEditor
      placeholder="Write something..."
      autoFocus={true}
      onChange={handleChangeInput}
      width="100%"
      height="500"
      defaultValue={props.content}
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize", "formatBlock"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["removeFormat"],
          ["fontColor", "hiliteColor"],
          ["indent", "outdent"],
          ["align", "horizontalRule", "list", "table"],
          ["link", "image", "video"],
          ["fullScreen", "showBlocks", "codeView"],
        ],
      }}
    />
  );
});

export default Editor;
