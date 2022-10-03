import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log(
      "state TE : ",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    return (
      <div className="w-100 d-flex">
        <Card className="mx-auto">
          <div>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <textarea
            style={{ resize: "none" }}
            rows={3}
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          ></textarea>
        </Card>
      </div>
    );
  }
}
