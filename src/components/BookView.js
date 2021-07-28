import { request } from '@octokit/request';
import { createReadStream } from 'fs';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import requireAuthentication from './Login/AuthenticatedLogin';

const BookView = (props) => {
    const [list, setList] = useState([]);
    const getData = async () => {
        const user = localStorage.getItem("userName")
        console.log(user)
        const headers = {
            "Authorization": "Token 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"
        }
        const response = await request('GET /users/{username}/repos', {
            username: 'harshit-001',
            sort: "created",
            headers: headers
        })
        console.log(response);


        setList(response.data);
        console.log(list)
    }
    const createRepo = async () => {
        const repoName = prompt("Please enter book name ");
        const headers = {
            "Authorization": "Token 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"
        }

        if (repoName) {
            const data = await request('POST /user/repos', {
                name: repoName,
                auto_init: true,
                headers: headers
            })
            console.log(data)
            setList(prev => [...prev, data.data])
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className=" align-items-center h-100">
                <table className="table table-hover mt-2">
                    <thead className="thead-light">
                        <tr >
                            <th scope="col">#</th>
                            <th className="text-center" scope="col">Book</th>
                            <th scope="col">View</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            list &&
                            list.map((item, index) => {
                                return (
                                    <tr className="p-3" key={index}>
                                        <th>{index + 1}</th>
                                        <td style={{ width: "80%", textAlign: "center", fontWeight: "bolder" }} scope="row">{item.name}</td>
                                        <td><Link to="/chapter"><button type="button" className="btn btn-primary align-items-center" onClick={() => props.getRepoName(item.name)}>View Chapters</button></Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="text-center mt-3">
                    <button type="button" className="btn btn-primary text-center" onClick={() => createRepo()}>Add New Book</button>
                </div>
            </div>
        </>
    )
}

export default requireAuthentication(BookView);
