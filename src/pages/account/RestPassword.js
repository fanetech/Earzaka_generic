import React from 'react';
import { Link } from 'react-router-dom';
import burkina from '../../assets/images/burkina.jpg';
import logo from '../../assets/images/logo1.png'


const RestPassword = () => {
    return (
        <div id="layoutAuthentication" style={{ backgroundImage: `url(${burkina})`, backgroundSize: 'cover' }}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header">
                                        <Link className="d-flex justify-content-center" to="/">
                                            <img src={logo} style={{ width: "70px"}} />
                                        </Link>
                                        <h3 className="text-center font-weight-light my-4">Récupération de mot de passe</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="small mb-3 text-muted">Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</div>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="inputEmail" type="email" />
                                                <label for="inputEmail">Adresse e-mail</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <Link className="small" to="/connection">Revenir à la connexion</Link>
                                                <a className="btn btn-primary" href="login.html">Réinitialiser le mot de passe</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/inscription">Besoin d'un compte? S'inscrire!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light opa-footer mt-auto">
                    <div className="container-fluid px-4">
                        <div className="container-fluid px-4">
                            <div className="text-muted text-center small">Copyright &copy; PN2 2022</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default RestPassword;
