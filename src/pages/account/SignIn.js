import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import burkina from '../../assets/images/burkina.jpg';
import methods from '../../constant';
import logo from '../../assets/images/logo1.png'
import { singIn } from '../../redux/auth/authAction';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';


const SignIn = ({ singIn }) => {

    const [showClavier, setShowClavier] = useState(false);
    const [load, setLoad] = useState(false);
    const [connexion, setConnexion] = useState({ 'login':'', 'mdpAgent':''});
    const [chiffre, setChiffre] = useState([1,2,3,4,5,6,7,8,9,0]);

    useEffect(() => {

        setChiffre(chiffre.sort(funcChiffre));

        function funcChiffre(a, b){  
            return 0.5 - Math.random();
        }
    },[])

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setConnexion({
            ...connexion,
            [nam]: val
        });
    }

    const blockOnkeydown = (bool) => {
        document.onkeydown = function (e) {
            var code;
            if (!e) var e = window.event;
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;

            if (code != 8)
                return bool;
        }
    }

    const pasteNotAllowFunc = () => {
        let myInput = document.getElementById('mdpAgent');
        myInput.onpaste = (e) => e.preventDefault();
    }

    const loginUserConfrime = async () => {
        if(connexion.login.length < 2){
            document.getElementById("errorlogin").innerText = "Le nombre de caractère minimum est 2.";
        }else{
            document.getElementById("errorlogin").innerText = "";
            if(connexion.mdpAgent.length != 6){
                document.getElementById("errormdpAgent").innerText = "Le nombre de caractère est 6.";
            }else{
                if (!methods.isNumeric(connexion.mdpAgent)) {
                    document.getElementById("errormdpAgent").innerText = "Veuillez saisir uniquement des chiffres.";
                }else{
                    document.getElementById("errormdpAgent").innerText = "";
                    if (await singIn(connexion) == true) {
                        Swal.fire({
                            text: "Un message vous a été envoyer.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: "btn btn-success"
                            }
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                if(methods.getLocalStorage("url_current") != null){
                                    window.location.pathname = methods.getLocalStorage("url_current");
                                }else{
                                    window.location.pathname = "/otp";
                                }
                            }
                        });
                    }else{
                        setLoad(false);
                        Swal.fire({
                            text: "Veuillez vérifier les informations saisies.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            customClass: {
                                confirmButton: "btn btn-danger"
                            }
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                
                            }
                        });
                    }
                }
            }
        }
    }

    return (
        <div id="layoutAuthentication" style={{ backgroundImage: `url(${burkina})`, backgroundSize: 'cover' }}>
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 mb-3">
                                    <div className="card-header">
                                        <Link className="d-flex justify-content-center" to="/">
                                            <img src={logo} style={{ width: "70px"}} />
                                        </Link>
                                        <h3 className="text-center font-weight-light my-4">Connexion</h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" onClick={() => blockOnkeydown(true)} id="login" name="login" type="text" value={connexion.login} onChange={(event) => myChangeHandler(event)}/>
                                                <label htmlFor="login">Adresse e-mail ou Pseudo</label>
                                                <small id="errorlogin" className="text-danger"></small>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" onClick={() => (setShowClavier(true),blockOnkeydown(false),pasteNotAllowFunc())} value={connexion.mdpAgent} id="mdpAgent" name="mdpAgent" type="password" onChange={(event) => myChangeHandler(event)}/>
                                                <label htmlFor="mdpAgent">Mot de passe</label>
                                                <small id="errormdpAgent" className="text-danger">{connexion.mdpAgent.length > 6 ? "Le nombre de caractère est 6.":""}</small>
                                            </div>
                                            {
                                                showClavier ?
                                                (
                                                    <div className="card  mb-3">
                                                        <div className="card-body">
                                                            <div className="row d-flex justify-content-end mb-3">
                                                                <a className="btn btn-close" type="button" onClick={() => setShowClavier(false)}></a>
                                                            </div>
                                                            <div className="row flex-container-connexion px-3-pin-password">
                                                                {
                                                                    chiffre.map((data,index) => {
                                                                        return(
                                                                            <a type="button" className="btn btn-password-pin" key={index} onClick={() => setConnexion({...connexion,'mdpAgent': connexion.mdpAgent+data})}>{data}</a>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                :""
                                            }
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" id="RememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="RememberPassword">Se souvenir du mot de passe</label>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-end mt-4 mb-0">
                                                {/* <Link type="button" className="small" data-toggle="button" to="/restauration-du-mot-de-passe">Mot de passe oublié?</Link> */}
                                                <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => (loginUserConfrime(),setLoad(true))}>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        {
                                                            load ?
                                                            (
                                                                <div class="spinner-border text-light me-1" role="status">
                                                                    <span class="sr-only">Loading...</span>
                                                                </div>
                                                            ):""
                                                        }
                                                        Connexion
                                                    </div>
                                                    
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/inscription">Besoin d'un compte? S'inscrire!</Link></div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light opa-footer mt-auto">
                    <div className="container-fluid px-4">
                        <div className="text-white text-center small">Copyright &copy; PN2 2022</div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        singIn: (user) => dispatch(singIn(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);