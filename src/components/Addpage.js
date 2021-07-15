import React, { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import { request } from '@octokit/request';
import { draftToMarkdown } from 'markdown-draft-js';

const Addpage = () => {
    const [data, setData] = useState('')
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const info = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        setData(info);
    }
    const saveFile = async () => {
        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('PUT /repos/{owner}/{repo}/contents/{path}', {
            path: `doc${((Date.parse(new Date())) / 1000).toString()}.md`,
            content: btoa(data),
            owner: 'Harshit671',
            repo: 'name',
            message: 'message',
            branch: 'master',
            headers: headers
        })
        console.log(response)
    }
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
            <div className="text-center">
                <Link to="/"><button type="button" className="btn btn-primary text-center" onClick={() => saveFile()}>Save</button></Link>
            </div>
        </div>
    )
}

export default Addpage
