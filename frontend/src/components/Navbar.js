// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { UserContext } from '../context/UserContext'; 
import './Navbar.css'; 

const Navbar = () => {
    const { user, setUser } = useContext(UserContext); 
    const navigate = useNavigate(); 
    console.log(user);

    const handleLogout = () => {
        setUser(null); // Clear user context
        localStorage.removeItem('token'); // Clear token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
            <Link to="/home" className="navbar-brand">
                Admin Dashboard
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/employees" className="nav-link">
                            Employee List
                        </Link>
                    </li>
                </ul>
                <div className="d-flex">
                    {user ? (
                        <>
                            <span className="navbar-text me-3">
                            <i className="bi bi-shield-lock-fill bi-xl me-2"></i> 
                                {user.username}
                            </span> {/* Display username */}
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-danger"
                            >
                                Logout
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;
