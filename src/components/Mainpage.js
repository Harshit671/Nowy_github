import { request } from '@octokit/request';
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Mainpage = (props) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        setLoading(true);
        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('GET /repos/{owner}/{repo}/contents/', {
            owner: 'Harshit671',
            repo: 'name',
            headers: headers,
            accept: "application/vnd.github.VERSION.raw+json"
        })
        console.log(response);
        response.data.map(async (item) => {
            const datas = await request(`GET /repos/{owner}/{repo}/contents/{path}`, {
                owner: 'Harshit671',
                repo: 'name',
                path: `${item.path}`,
                headers: headers
            })
            console.log(datas);
            //  console.log(atob(data.data.content));
            setList(prevList => [...prevList, {
                data: atob(datas.data.content),
                sha: datas.data.sha,
                name: datas.data.name
            }]);
        })
    }
    useMemo(() => {
        getData();
    }, [])

    const getList = async () => {
        const headers = {
            "Authorization": "Token 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"
        }
        const list = await request('GET /repos/{owner}/{repo}/compare/{basehead}', {
            owner: 'Harshit671',
            repo: 'name',
            basehead: "master...master",
            headers: headers
        })
        console.log(list);
    }
    return (

        <>
            {
                !loading ? (<div className="loader center text-center">
                    <i className="fa fa-cog fa-spin " style={{ fontSize: "2em" }} />
                </div>) : (
                    <div className="d-flex align-items-center h-100">
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr >
                                    <th scope="col">Name</th>
                                    <th className="text-center" scope="col">Text</th>
                                    <th scope="col">View</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <tr className="p-3" key={index}>
                                                <th>Name</th>
                                                <td style={{ width: "80%" }} scope="row"><ReactMarkdown>{item.data}</ReactMarkdown></td>
                                                <td><Link to="/view"><button type="button" className="btn btn-primary align-items-center" onClick={() => { props.getData(item.sha, item.data, item.name) }}>View</button></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="text-center">
                            <Link to="/add"><button type="button" className="btn btn-primary text-center" onClick={() => { }}>Add File</button></Link>
                            <button type="button" className="btn btn-primary text-center" onClick={() => getList()}>List File</button>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Mainpage
