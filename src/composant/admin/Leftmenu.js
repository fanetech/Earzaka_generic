import React from 'react';
import { Link } from 'react-router-dom';
import methods from '../../constant';


const Leftmenu = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" style={{ background: "#033d7c" }} id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading"></div>
                        <Link className="nav-link text-white" to="/">
                            <div className="sb-nav-link-icon text-white"><i className="fas fa-tachometer-alt"></i></div>
                            Tableau de bord
                        </Link>
                        {
                            (methods.dataUser().nomProfilAgent.toLowerCase() != "gestionnaire") ?
                            (
                                <>
                                    <a className="nav-link collapsed text-white" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1" aria-expanded="false" aria-controls="collapseLayouts">
                                        <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-building"></i></div>
                                            Structure
                                        <div className="sb-sidenav-collapse-arrow text-white"><i className="fas fa-angle-down"></i></div>
                                    </a>
                                    <div className="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                        <nav className="sb-sidenav-menu-nested nav">
                                            {
                                                (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général") ?
                                                (
                                                    <Link className="nav-link text-white" to="/regie">
                                                        <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-folder-tree"></i></div>
                                                        Régie
                                                    </Link>
                                                ):""
                                            }
                                            {
                                                (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général" || methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur") ?
                                                (
                                                    <Link className="nav-link text-white" to="/structure">
                                                        <div className="sb-nav-link-icon text-white"><i className="fas fa-house"></i></div>
                                                        Structure
                                                    </Link>
                                                ):""
                                            }
                                        </nav>
                                    </div>
                                </>
                            ):""
                        }
                        <a className="nav-link collapsed text-white" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts2" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-user-tie"></i></div>
                                Utilisateur
                            <div className="sb-sidenav-collapse-arrow text-white"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts2" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                {
                                    (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général") ?
                                    (
                                        <Link className="nav-link text-white" to="/profil">
                                            <div className="sb-nav-link-icon text-white"><i className="fas fa-id-card-alt"></i></div>
                                            Profil
                                        </Link>
                                    ):""
                                }
                                <Link className="nav-link text-white" to="/utilisateur">
                                    <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-users"></i></div>
                                    Utilisateur
                                </Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed text-white" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts3" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-file-invoice"></i></div>
                                Service
                            <div className="sb-sidenav-collapse-arrow text-white"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts3" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                {
                                    (methods.dataUser().nomProfilAgent.toLowerCase() != "gestionnaire") ?
                                    (
                                        <>
                                            <Link className="nav-link text-white" to="/categorie">
                                                <div className="sb-nav-link-icon text-white"><i className="fas fa-folder-plus"></i></div>
                                                Catégorie
                                            </Link>
                                            <Link className="nav-link text-white" to="/souscategorie">
                                                <div className="sb-nav-link-icon text-white"><i className="fas fa-folder"></i></div>
                                                Sous-Catégorie
                                            </Link>
                                        </>
                                    ):""
                                }
                                <Link className="nav-link text-white" to="/service">
                                    <div className="sb-nav-link-icon text-white"><i className="fas fa-suitcase"></i></div>
                                    Service
                                </Link>
                            </nav>
                        </div>
                        <a className="nav-link collapsed text-white" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts4" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-ticket-simple"></i></div>
                                Guichet
                            <div className="sb-sidenav-collapse-arrow text-white"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts4" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link text-white" to="/pointdeservice">
                                    <div className="sb-nav-link-icon text-white"><i className="fas fa-suitcase"></i></div>
                                    Point de service
                                </Link>
                                <Link className="nav-link text-white" to="/guichet">
                                    <div className="sb-nav-link-icon text-white"><i className="fas fa-folder-plus"></i></div>
                                    Guichet
                                </Link>
                            </nav>
                        </div>
                        <Link className="nav-link text-white" to="/typedetransaction">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-right-left"></i></div>
                            Type de transaction
                        </Link>
                        <Link className="nav-link text-white" to="/moyendepaiement">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-money-bill-wave"></i></div>
                            Moyen de paiement
                        </Link>
                        <Link className="nav-link text-white" to="/liquidation">
                            <div className="sb-nav-link-icon text-white"><i className="fas fa-calculator"></i></div>
                            Liquidation
                        </Link>
                        <Link className="nav-link text-white" to="/demandeevaluation">
                            <div className="sb-nav-link-icon text-white"><i className="fa fa-address-card"></i></div>
                            Demande d'evaluation
                        </Link>
                        <Link className="nav-link text-white" to="/evaluation">
                            <div className="sb-nav-link-icon text-white"><i className="fa-solid fa-scale-balanced"></i></div>
                            Evaluation
                        </Link>
                    </div>
                </div>
                <div className="sb-sidenav-footer" style={{ background: "#033d7c" }}>
                    <div className="small">
                        <br/>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Leftmenu;
