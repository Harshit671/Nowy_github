import { request } from '@octokit/request';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { addUser, showDocument } from '../Mongo';
import requireAuthentication from './Login/AuthenticatedLogin';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const ChapterView = (props) => {
    const classes = useStyles();

    const [list, setList] = useState([]);
    const [changeList, setChangeList] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);



    const createBranch = async () => {
        const user = localStorage.getItem("userName")
        console.log(user)
        console.log(props.repoName)
        const headers = {
            "Authorization": "Token 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"
        }
        const branchNames = await request('GET /repos/{owner}/{repo}/branches', {
            owner: 'harshit-001',
            repo: props.repoName
        })
        console.log(branchNames)
        const branches = branchNames.data.map(item => item.name);
        console.log(branches);
        const status = branches.includes(user);
        console.log(!status)

        if (!status) {
            addUser(user)
            const branchNames = await request('GET /repos/{owner}/{repo}/branches', {
                owner: 'harshit-001',
                repo: props.repoName
            })
            console.log(branchNames)
            const branches = branchNames.data.map(item => item.name);
            console.log(branches);
            const status = branches.includes(user);
            console.log(!status)
            if (!status) {
                const commits = await request('GET /repos/{owner}/{repo}/commits', {
                    owner: 'harshit-001',
                    repo: props.repoName,
                    sha: 'master'
                })
                const sha = commits.data[0].sha
                console.log(sha);
                try {
                    const branchData = await request(`POST /repos/harshit-001/${props.repoName}/git/refs`, {
                        ref: `refs/heads/${user}`,
                        sha: sha,
                        headers: headers
                    })
                    console.log(branchData);
                } catch (error) {
                    console.log(error)
                }

            }
        }
    }
    const getData = async () => {
        setList([]);

        const user = localStorage.getItem("userName")
        console.log(user)

        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('GET /repos/{owner}/{repo}/contents/', {
            owner: 'harshit-001',
            repo: props.repoName,
            headers: headers,
            accept: "application/vnd.github.VERSION.raw+json"
        }).then(response => {
            //console.log(response);

            response.data.map(async (item) => {
                const datas = await request(`GET /repos/{owner}/{repo}/contents/{path}`, {
                    owner: 'harshit-001',
                    repo: props.repoName,
                    path: `${item.path}`,
                    sort: "created",
                    headers: headers
                })
                console.log(datas);
                //  console.log(atob(data.data.content));
                setList(prevList => [...prevList, {
                    data: atob(datas.data.content),
                    sha: datas.data.sha,
                    fileName: datas.data.name
                }]);
            })
        })
        setLoading(false);

    }
    useEffect(() => {
        createBranch();

    }, [])
    useEffect(() => {
        setTimeout(() => getData(), 4000)
    }, [])



    const getChanges = async () => {
        const changes = await showDocument(props.repoName);
        setChangeList(changes);
        console.log(changes)
    }
    const addChapter = () => {
        const chapterName = prompt("Please enter chapter name ");
        props.getChapterName(chapterName);
    }

    return (
        <>
            {
                loading ? (<div className={classes.root} style={{ display: "block", display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </div>) : (
                    <div className=" align-items-center h-100">

                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr >
                                    <th scope="col">#</th>
                                    <th className="text-center" scope="col">Text</th>
                                    <th scope="col">View</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <tr className="p-3" key={index}>
                                                <th>{index + 1}</th>
                                                <td style={{ width: "80%", textAlign: "center", fontWeight: "bolder" }} scope="row">{item.fileName}</td>
                                                <td><Link to="/view"><button type="button" className="btn btn-primary align-items-center" onClick={() => { props.getData(item.sha, item.data, item.fileName) }}>View</button></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="text-center ml-2">
                            <Link to="/add"><button type="button" className="btn btn-primary text-center " onClick={() => addChapter()}>Add Chapter</button></Link>
                            <button type="button" className="btn btn-primary text-center " onClick={() => { getChanges(); setShow(!show) }}>{!show ? "Show Changes" : "Hide Changes"}</button>
                            <Link to="/"><button type="button" className="btn btn-danger text-center" onClick={() => { }}>Back</button></Link>
                        </div>
                        <div className="text-align-left">
                            {
                                changeList.length > 0 ? (
                                    show &&
                                    <table className="table table-striped">
                                        <thead>
                                            <tr >
                                                <th scope="col">#</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Changed By</th>
                                                <th scope="col" >Filename</th>
                                                <th scope="col" >Status</th>
                                                <th scope="col" >Old Content</th>
                                                <th scope="col" >New Content</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                changeList.map((item, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{item.time}</td>
                                                                <td>{item.User}</td>
                                                                <td>{item.fileName}</td>
                                                                <td>{item.status}</td>
                                                                <td className="text-danger"><ReactMarkdown>{item.patch[1].substring(1)}</ReactMarkdown></td>
                                                                <td className="text-success"><ReactMarkdown>{item.patch.length === 4 ? (item.patch[2] && item.patch[2].substring(1)) : (item.patch[3] && item.patch[3].substring(1))}</ReactMarkdown></td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) : (show && <h4 className="text-center mt-4"> No changes Yet</h4>)
                            }
                        </div>
                    </div>)

            }
        </>

    )
}

export default requireAuthentication(ChapterView);
