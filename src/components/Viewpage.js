import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
const Viewpage = (props) => {
    return (

        <div className="jumbotron h-100 col">
            <p className="lead text-center"><ReactMarkdown>{props.data.info}</ReactMarkdown></p>
            <hr className="my-4" />
            <p className="lead text-center">
                <Link to="/edit"><button type="button" className="btn btn-primary" >Edit</button></Link>
            </p>
        </div>

    )
}

export default Viewpage
