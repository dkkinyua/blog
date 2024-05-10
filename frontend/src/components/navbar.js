import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../auth'

function Navbar() {

    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
    const [logged] = useAuth()

    const LoggedLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/posts">Create Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/posts" onClick={() => { logout() }}>Logout</Link>
                </li>
            </>
        )
    }

    const LoggedOutLinks = () => {
        return (
            <>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
            </>
        )
    }

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
                        {logged ? <LoggedLinks /> : <LoggedOutLinks />}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
