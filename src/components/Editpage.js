import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Link } from 'react-router-dom';
import { request } from '@octokit/request';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { addDocument } from '../Mongo';
import requireAuthentication from './Login/AuthenticatedLogin';

const Editpage = (props) => {
    const [data, setData] = useState('')
    const [editorState, setEditorState] = useState(

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

        const user = localStorage.getItem("userName")
        console.log(props.data.id, "helllooloolololol", props.data.name)
        try {
            const response = await request('PUT /repos/{owner}/{repo}/contents/{path}', {
                path: props.data.name,
                content: btoa(data),
                owner: 'harshit-001',
                repo: props.repoName,
                message: 'message',
                branch: user,
                sha: props.data.id,
                headers: headers
            })
            console.log(response)
        } catch (error) {
            console.log(error);
        }


        const listFile = await request('GET /repos/{owner}/{repo}/compare/{basehead}', {
            accept: "application/vnd.github.VERSION.diff",
            owner: 'harshit-001',
            repo: props.repoName,
            basehead: `master...${user}`,
            headers: headers
        })
        addDocument(listFile.data.files[0], props.repoName);
        console.log(listFile.data.files[0])
        console.log(user)
        try {
            const merge = await request('POST /repos/{owner}/{repo}/merges', {
                owner: 'harshit-001',
                repo: props.repoName,
                base: 'master',
                head: user,
                headers: headers
            })
            console.log("mergeeeeeeee", merge)
        } catch (error) {
            console.log("error : ", error)
        }


    }


    useEffect(() => {
        const draftContent = markdownToDraft(props.data.info)
        const finalData = convertFromRaw(draftContent)
        setEditorState(EditorState.createWithContent(finalData));
    }, [])
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
                <Link to="/chapter"><button type="button" className="btn btn-primary text-center" onClick={() => updateFile()}>Update</button></Link>
                <Link to="/chapter"><button className="btn btn-danger " href="#" role="button">Cancel</button></Link>
            </div>
        </div>
    )
}

export default requireAuthentication(Editpage);
