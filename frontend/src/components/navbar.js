import { useState } from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
    
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
    
    const toggleNavbar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Blooog</Link>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/posts">Create Post</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
