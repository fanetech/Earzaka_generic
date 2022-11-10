import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import methods from '../../constant';

const Header = () => {

    const sidebarToggle = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }

    return (
        <nav className="sb-topnav navbar navbar-expand" style={{ background: "#033d7c" }}>
            <Link className="d-md-flex d-lg-flex navbar-brand ps-3 justify-content-center" to="/">
                <img src={logo} style={{ width: "70px"}} />
            </Link>
            <button onClick={(event) => sidebarToggle(event)} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 text-white" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <marquee className="text-white">Plateforme Nationale de Paiement Numérique PN2</marquee>
            <ul className="navbar-nav  ms-auto me-md-3 ms-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {methods.dataUser().loginAgent}
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        {/* <li><a className="dropdown-item" href="#!">Paramètre</a></li> */}
                        {/* <li><hr className="dropdown-divider" /></li> */}
                        <li><Link className="dropdown-item" to="/" onClick={() => (window.localStorage.removeItem("user"),window.localStorage.removeItem("url_current"),window.location.pathname = "/")}>Se déconnecter</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Header
