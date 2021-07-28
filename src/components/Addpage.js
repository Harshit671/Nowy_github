import React, { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import { request } from '@octokit/request';
import { draftToMarkdown } from 'markdown-draft-js';
import { addDocument } from '../Mongo';

const Addpage = (props) => {
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
        const user = localStorage.getItem("userName")
        console.log(props.repoName, "hhgjgjgjhgjhgjh", props.chapterName, "userrrr", user)
        const response = await request('PUT /repos/{owner}/{repo}/contents/{path}', {
            path: `${props.chapterName}.md`,
            content: btoa(data),
            owner: 'harshit-001',
            repo: props.repoName,
            message: 'message',
            branch: user,
            headers: headers
        })

        const listFile = await request('GET /repos/{owner}/{repo}/compare/{basehead}', {
            accept: "application/vnd.github.VERSION.diff",
            owner: 'harshit-001',
            repo: props.repoName,
            basehead: `master...${user}`,
            headers: headers
        })
        console.log(listFile);
        addDocument(listFile.data.files[0], props.repoName);
        console.log(listFile.data.files[0])
        try {
            const merge = await request('POST /repos/{owner}/{repo}/merges', {
                owner: 'harshit-001',
                repo: props.repoName,
                base: 'master',
                head: user,
                headers: headers
            })
            console.log(response, "mergeeeeee", merge)
        } catch (error) {
            console.log("merge error: ", error)
        }
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
                <Link to="/chapter"><button type="button" className="btn btn-primary text-center " onClick={() => saveFile()}>Save</button></Link>
                <Link to="/chapter"><button type="button" className="btn btn-danger text-center" >Cancel</button></Link>
            </div>
        </div>
    )
}

export default Addpage
