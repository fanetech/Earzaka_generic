import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import methods from '../../constant';

const Header = () => {

    const headerAutorized = () => {

        if (methods.getLocalStorage("user") == null) {
            return (
                <>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <div className="d-flex justify-content-end py-auto">
                                <Link className="btn btn-outline-light px-3 me-sm-3" to="/connection">Se connecter</Link>
                                {/* <Link className="btn btn-primary px-3 text-white" to="/inscription">Créer un compte</Link> */}
                            </div>
                        </li>
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-md-5 me-md-3 ms-0 me-3 me-lg-4">
                        <li className="nav-item">
                            <Link className="nav-link active text-white rounded-pill headerA px-3" aria-current="page" to="/" >Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white rounded-pill headerA px-3" aria-current="page" to="/effectuerliquidation" >Liquidation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white rounded-pill headerA px-3" aria-current="page" to="/effectuerdemandeevaluation" >Demande d'evaluation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white rounded-pill headerA px-3" to="/historique">Historique</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav  ms-auto me-md-3 ms-0 me-3 me-lg-4">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white px-3" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {methods.dataUser().loginAgent}
                                <i className="fas fa-user fa-fw"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/" onClick={() => (window.localStorage.removeItem("user"),window.localStorage.removeItem("url_current"),window.location.pathname = "/")}>Déconnexion</Link></li>
                            </ul>
                        </li>
                    </ul>
                </>
            )
        }

    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#033d7c" }}>
                <div className="container">
                    <Link className="d-md-flex d-lg-flex navbar-brand ps-3 justify-content-center" to="/">
                        <img src={logo} style={{ width: "70px"}} />
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {headerAutorized()}
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
