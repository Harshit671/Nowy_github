import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import { request } from '@octokit/request';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

const Editpage = (props) => {
    const [data, setData] = useState('')
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        const info = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        setData(info);
    }
    const updateFile = async () => {
        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('PUT /repos/{owner}/{repo}/contents/{path}', {
            path: props.data.name,
            content: btoa(data),
            owner: 'Harshit671',
            repo: 'name',
            message: 'message',
            branch: 'master',
            sha: props.data.id,
            headers: headers
        })
        console.log(response)
    }


    useEffect(() => {
        const draftContent = markdownToDraft(props.data.info)
        const finalData = convertFromRaw(draftContent)
        setEditorState(EditorState.createWithContent(finalData));
    }, [props.data.info])
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
                <Link to="/"><button type="button" className="btn btn-primary text-center" onClick={() => updateFile()}>Update</button></Link>
            </div>
        </div>
    )
}

export default Editpage
