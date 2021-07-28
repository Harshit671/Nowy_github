import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import requireAuthentication from './Login/AuthenticatedLogin'
const Viewpage = (props) => {
    return (

        <div className="card text-center">
            <div className="card-header">
                View
            </div>
            <div className="card-body">

                <p className="card-text"><ReactMarkdown>{props.data.info}</ReactMarkdown></p>
                <Link to="/edit"><button type="button" className="btn btn-primary mr-2">Edit</button></Link>
                <Link to="/chapter"><button className="btn btn-danger " href="#" role="button">Cancel</button></Link>
            </div>
        </div>

    )
}

export default requireAuthentication(Viewpage);
