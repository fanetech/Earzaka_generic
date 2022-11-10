import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../redux/user/userAction';
import { getAllProfiles } from '../../redux/profile/profileAction';
import { getAllStructures } from '../../redux/structure/structureAction';
import methods from '../../constant';
import Swal from 'sweetalert2';
import burkina from '../../assets/images/burkina.jpg';
import logo from '../../assets/images/logo1.png'

const SignUp = ({ createUser, getAllProfiles, getAllStructures, apiLoadingStructures, apiDataStructures, apiLoadingProfiles, apiDataProfiles }) => {

    const [user, setUser] = useState({ 'idStructure': '','idProfilAgent': '','fonctionAgent': '','loginAgent': '','nomAgent': '','prenomAgent': '','emailAgent': '','telAgent': '','mdpAgent': '' });
    const [user0, setUser0] = useState({ 'mdpAgent_config': ''});

    useEffect(() => {
        if (!apiLoadingProfiles) {
            getAllProfiles();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }

        if (apiLoadingProfiles) {
            setUser({
                ...user,
                'statut': false,
                'idProfilAgent': apiDataProfiles.filter(data => data.libelleProfilAgent.toLowerCase() == 'utilisateur')[0].idProfilAgent
            });
        }
    })

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setUser({
            ...user,
            [nam]: val
        });
    }

    const myChangeHandler0 = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setUser0({
            ...user0,
            [nam]: val
        });
    }

    const createUserConfrime = async () => {
        if(user.idStructure.length < 1){
            document.getElementById("erroridStructure").innerText = "Veuillez choisir une structure."
        }else{
            document.getElementById("erroridStructure").innerText = "";
            if(user.fonctionAgent.length < 2){
                document.getElementById("errorfonctionAgent").innerText = "Le nombre de caractère minimum est 2.";
            }else{
                document.getElementById("errorfonctionAgent").innerText = "";
                if(user.loginAgent.length < 2){
                    document.getElementById("errorloginAgent").innerText = "Le nombre de caractère minimum est 2.";
                }else{
                    document.getElementById("errorloginAgent").innerText = "";
                    if(user.nomAgent.length < 2){
                        document.getElementById("errornomAgent").innerText = "Le nombre de caractère minimum est 2.";
                    }else{
                        document.getElementById("errornomAgent").innerText = "";
                        if(user.prenomAgent.length < 2){
                            document.getElementById("errorprenomAgent").innerText = "Le nombre de caractère minimum est 2.";
                        }else{
                            document.getElementById("errorprenomAgent").innerText = "";
                            if(!methods.validateEmail(user.emailAgent)){
                                document.getElementById("erroremailAgent").innerText = "Cet email n'est pas valide.";
                            }else{
                                document.getElementById("erroremailAgent").innerText = "";
                                if(user.telAgent.length < 2){
                                    document.getElementById("errortelAgent").innerText = "Le nombre de caractère minimum est 2.";
                                }else{
                                    document.getElementById("errortelAgent").innerText = "";
                                    if(user.mdpAgent.length != 6){
                                        document.getElementById("errormdpAgent").innerText = "Le nombre de caractère est 6.";
                                    }else{
                                        if (!methods.isNumeric(user.mdpAgent)) {
                                            document.getElementById("errormdpAgent").innerText = "Veuillez saisir uniquement des chiffres.";
                                        }else{
                                            document.getElementById("errormdpAgent").innerText = "";
                                            if(user0.mdpAgent_config.length != 6){
                                                document.getElementById("errormdpAgent_config").innerText = "Le nombre de caractère est 6.";
                                            }else{
                                                if (!methods.isNumeric(user0.mdpAgent_config)) {
                                                    document.getElementById("errormdpAgent_config").innerText = "Veuillez saisir uniquement des chiffres.";
                                                }else{
                                                    if (user0.mdpAgent_config != user.mdpAgent) {
                                                        document.getElementById("errormdpAgent_config").innerText = "Le mot de passe et le mot de passe de confirmation ne sont pas identiques.";
                                                        document.getElementById("errormdpAgent").innerText = "Le mot de passe et le mot de passe de confirmation ne sont pas identiques.";
                                                    }else{
                                                        document.getElementById("errormdpAgent_config").innerText = "";
                                                        document.getElementById("errormdpAgent").innerText = "";
                                                        if (await createUser(user) == true) {
                                                            Swal.fire({
                                                                text: "Veuillez informer le gestionnaire afin que vous compte soit activer.",
                                                                icon: "success",
                                                                buttonsStyling: false,
                                                                confirmButtonText: "OK",
                                                                customClass: {
                                                                    confirmButton: "btn btn-success"
                                                                }
                                                            }).then(function (result) {
                                                                if (result.isConfirmed) {
                                                                    window.location.pathname = "/connection";
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
                            <div className="col-lg-7">
                                <div className="card shadow-lg border-0 rounded-lg mt-5 mb-3">
                                    <div className="card-header">
                                        <Link className="d-flex justify-content-center" to="/">
                                            <img src={logo} style={{ width: "70px"}} />
                                        </Link>
                                        <h3 className="text-center font-weight-light my-4">Créer un compte</h3>
                                    </div>
                                    <div className="card-body">
                                        { (apiLoadingProfiles && Object.keys(apiDataProfiles).length > 0) && (apiLoadingStructures && Object.keys(apiDataStructures).length > 0) ?
                                            (
                                                <form>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <select className="form-control" name="idStructure" id="idStructure" onChange={(event) => myChangeHandler(event)}>
                                                                    <option value={''}>Choisir une structure...</option>
                                                                    {
                                                                        apiDataStructures.map((data) => {
                                                                            return(<option value={data.idStructure} key={data.idStructure}>{data.nomStructure}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                                <label htmlFor="idStructure">Structure</label>
                                                                <small id="erroridStructure" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input className="form-control" name="fonctionAgent" id="fonctionAgent" type="text" value={user.fonctionAgent} required onChange={(event) => myChangeHandler(event)} />
                                                                <label htmlFor="fonctionAgent">Fonction</label>
                                                                <small id="errorfonctionAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" name="loginAgent" id="loginAgent" type="text" value={user.loginAgent} required onChange={(event) => myChangeHandler(event)} />
                                                                <label htmlFor="loginAgent">Pseudo</label>
                                                                <small id="errorloginAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input className="form-control" name="nomAgent" id="nomAgent" type="text" value={user.nomAgent} required onChange={(event) => myChangeHandler(event)} />
                                                                <label htmlFor="nomAgent">Nom</label>
                                                                <small id="errornomAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" name="prenomAgent" id="prenomAgent" type="text" value={user.prenomAgent} required onChange={(event) => myChangeHandler(event)} />
                                                                <label htmlFor="prenomAgent">Prénom</label>
                                                                <small id="errorprenomAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating">
                                                                <input className="form-control" id="telAgent" name="telAgent" type="text" value={user.telAgent} required onChange={(event) => myChangeHandler(event)} />
                                                                <label htmlFor="telAgent">Téléphone</label>
                                                                <small id="errortelAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" name="emailAgent" id="emailAgent" type="email" value={user.emailAgent} required onChange={(event) => myChangeHandler(event)}  />
                                                        <label htmlFor="emailAgent">Adresse e-mail</label>
                                                        <small id="erroremailAgent" className="text-danger"></small>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" name="mdpAgent" id="mdpAgent" type="password" value={user.mdpAgent} required onChange={(event) => myChangeHandler(event)} autoComplete="on" />
                                                                <label htmlFor="mdpAgent">Mot de passe</label>
                                                                <small id="errormdpAgent" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-floating mb-3 mb-md-0">
                                                                <input className="form-control" name="mdpAgent_config" id="mdpAgent_config" type="password" value={user0.mdpAgent_config} required onChange={(event) => myChangeHandler0(event)} autoComplete="on" />
                                                                <label htmlFor="mdpAgent_config">Confirmez le mot de passe</label>
                                                                <small id="errormdpAgent_config" className="text-danger"></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mt-2 p-2">
                                                        <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => createUserConfrime()} data-toggle="button">Inscrire</button>
                                                    </div>
                                                </form>
                                            ):(<p></p>)
                                        }
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small">
                                            <Link to="/connection">Avoir un compte? Aller à la connexion</Link>
                                        </div>
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
                        <div className="text-muted text-center small">Copyright &copy; PN2 2022</div>
                    </div>
                </footer>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures,
        apiLoadingProfiles: state.profileReducer.loadingProfile,
        apiDataProfiles: state.profileReducer.profiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (user) => dispatch(createUser(user)),
        getAllProfiles: ()   => dispatch(getAllProfiles()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
