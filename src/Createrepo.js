import { Octokit } from '@octokit/core';
import { request } from '@octokit/request';
import React, { useEffect, useState } from 'react'
import { createTokenAuth } from "@octokit/auth-token";
import { saveAs } from 'file-saver';
import { promises as fsp } from "fs";
//import writeFileP from 'write-file-p';
import * as fs from 'fs';
const Createrepo = () => {
    const [data, setData] = useState("");
    const createRepo = async () => {
        const TOKEN = "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";

        // const auth = createTokenAuth(TOKEN);
        // const authentication = await auth();

        const headers = {
            "Authorization": "Token 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"
        }
        //     const octokit = new Octokit
        //     // const data = await request('POST /orgs/{org}/repos', {
        //     //     org: 'harshit67',
        //     //     name: 'name1',
        //     //     headers: headers
        //     // })
        const data = await request('POST /user/repos', {
            name: 'name',
            headers: headers
        })

        // console.log(data)

        // useEffect(() => {
        //     fetch('https://api.github.com/users/Harshit671')
        //         .then(res => res.json())
        //         .then(data => { console.log(data) })
        // }, [])
        // { console.log(authentication) }
    }
    const addBlob = async () => {
        const headers = {
            "Authorization": "Token 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"
        }
        const data = await request('POST /repos/{owner}/{repo}/git/commits', {
            owner: 'Harshit671',
            repo: 'name',
            message: 'message',
            tree: 'master',
            headers: headers
        })
        console.log(data);
    }
    const onChange = (e) => {
        setData(e.target.value);
    }
    const getFile = async () => {
        const res = await request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Harshit671',
            repo: 'name',
            path: 'output3'
        })
        console.log(atob(res.data.content));
    }
    const addFile = async () => {
        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('PUT /repos/{owner}/{repo}/contents/{path}', {
            path: `doc${((Date.parse(new Date())) / 1000).toString()}.md`,
            content: btoa(document.getElementById('myInput').value),
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
            <input type="search" id="myInput" onChange={(e) => onChange(e)} />
            <button onClick={() => createRepo()}>create</button>
            <button onClick={() => addBlob()}>Blob</button>
            <button onClick={() => addFile()}>AddFile</button>
            <button onClick={() => getFile()}>GetFile</button>
        </div>
    )
}

export default Createrepo
