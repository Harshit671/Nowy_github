import React from 'react'
import './style.css'



const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("userName");
        window.location.reload();

    }
    return (
        <div style={{ position: "sticky", top: "0" }}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand " href="">Github</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" >Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link "  >Contact</a>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}>
                                <a className="nav-link pe-auto" aria-disabled="true" onClick={() => handleLogout()}><i className="fas fa-sign-out-alt"></i>LogOut</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
