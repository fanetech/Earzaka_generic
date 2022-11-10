import React from 'react';
import { Link } from 'react-router-dom';
import error from '../assets/svg/error-404-monochrome.svg'

const NotFound = () => {
    return (
        <div id="layoutError">
            <div id="layoutError_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center mt-4">
                                    <img className="mb-4 img-error" src={error} />
                                    <p className="lead">Cette URL demandée est introuvable sur ce serveur.</p>
                                    <Link to="/">
                                        <i className="fas fa-arrow-left me-1"></i>
                                        Retour
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutError_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="text-muted text-center small">Copyright &copy; PN2 2022</div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default NotFound
