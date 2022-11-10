import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, getAllUsers } from '../../redux/user/userAction';
import { getAllProfiles } from '../../redux/profile/profileAction';
import { getAllStructures } from '../../redux/structure/structureAction';
import Swal from 'sweetalert2';
import methods from '../../constant';

const EditUser = ({ updateUser, getAllProfiles, getAllStructures, apiLoadingStructures, apiDataStructures, apiLoadingProfiles, apiDataProfiles, apiLoadingUsers, apiDataUsers, getAllUsers }) => {

    let { id } = useParams();

    const [user, setUser] = useState({ 'idStructure': '','idProfilAgent': '','fonctionAgent': '','loginAgent': '','nomAgent': '','prenomAgent': '','emailAgent': '','telAgent': '','mdpAgent': '' });
    const [user0, setUser0] = useState({ 'mdpAgent_config': ''});
    const [showpassword, setShowpassword] = useState(false);

    useEffect(() => {
        if (!apiLoadingUsers) {
            getAllUsers();
        }

        if (!apiLoadingProfiles) {
            getAllProfiles();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }

        if (apiLoadingUsers) {
            let dataUpdate = apiDataUsers.filter(data => data.idAgent == id);
            if(dataUpdate.length == 1){
                setUser(dataUpdate[0])
            }
        }
    },[]);

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

    const updateUserConfrime = () => {
        if(user.idStructure.length < 1){
            document.getElementById("erroridStructure").innerText = "Veuillez choisir une structure."
        }else{
            document.getElementById("erroridStructure").innerText = "";
            if(user.idProfilAgent.length < 1){
                document.getElementById("erroridProfilAgent").innerText = "Veuillez choisir un profil.";
            }else{
                document.getElementById("erroridProfilAgent").innerText = "";
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
                                        if (showpassword) {
                                            if(user.mdpAgent.length < 6){
                                                document.getElementById("errormdpAgent").innerText = "Le nombre de caractère minimum est 6.";
                                            }else{
                                                document.getElementById("errormdpAgent").innerText = "";
                                                if(user0.mdpAgent_config.length < 6){
                                                    document.getElementById("errormdpAgent_config").innerText = "Le nombre de caractère minimum est 6.";
                                                }else{
                                                    if (user0.mdpAgent_config != user.mdpAgent) {
                                                        document.getElementById("errormdpAgent_config").innerText = "Le mot de passe et le mot de passe de confirmation ne sont pas identiques.";
                                                        document.getElementById("errormdpAgent").innerText = "Le mot de passe et le mot de passe de confirmation ne sont pas identiques.";
                                                    }else{
                                                        document.getElementById("errormdpAgent_config").innerText = "";
                                                        document.getElementById("errormdpAgent").innerText = "";
                                                        if (updateUser(user.idAgent,user)) {
                                                            Swal.fire({
                                                                text: "Les information de l'utilisateur a étè modifier.",
                                                                icon: "success",
                                                                buttonsStyling: false,
                                                                confirmButtonText: "OK",
                                                                customClass: {
                                                                    confirmButton: "btn btn-success"
                                                                }
                                                            }).then(function (result) {
                                                                if (result.isConfirmed) {
                                                                    window.location.pathname = "/utilisateur";
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }else{
                                            if (updateUser(user.idAgent,user)) {
                                                Swal.fire({
                                                    text: "Les information de l'utilisateur a étè modifier.",
                                                    icon: "success",
                                                    buttonsStyling: false,
                                                    confirmButtonText: "OK",
                                                    customClass: {
                                                        confirmButton: "btn btn-success"
                                                    }
                                                }).then(function (result) {
                                                    if (result.isConfirmed) {
                                                        window.location.pathname = "/utilisateur";
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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Utilisateurs</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Modifier l'utilisateur</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                    { (apiLoadingProfiles && Object.keys(apiDataProfiles).length > 0) && (apiLoadingStructures && Object.keys(apiDataStructures).length > 0) ?
                        (
                            <form>
                                <div className="col-sm-12 col-md-12 mb-2">
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <select defaultValue={apiDataStructures.filter(data => data.idStructure == user.idStructure)[0].idStructure} className="form-control" name="idStructure" id="idStructure" onChange={(event) => myChangeHandler(event)}>
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
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <select defaultValue={apiDataProfiles.filter(data => data.idProfilAgent == user.idProfilAgent)[0].idProfilAgent} className="form-control" name="idProfilAgent" id="idProfilAgent" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir un profil...</option>
                                                    {
                                                        methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général" ?
                                                            apiDataProfiles.filter(data => data.statut == true).map((data) => {
                                                                return(<option value={data.idProfilAgent} key={data.idProfilAgent}>{data.libelleProfilAgent}</option>)
                                                            })
                                                        :
                                                            apiDataProfiles.filter(data => data.statut == true && data.libelleProfilAgent.toLowerCase() != "administrateur général").map((data) => {
                                                                return(<option value={data.idProfilAgent} key={data.idProfilAgent}>{data.libelleProfilAgent}</option>)
                                                            })
                                                    }
                                                </select>
                                                <label htmlFor="idProfilAgent">Profil</label>
                                                <small id="erroridProfilAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input className="form-control" name="fonctionAgent" id="fonctionAgent" type="text" value={user.fonctionAgent} required onChange={(event) => myChangeHandler(event)} />
                                                <label htmlFor="fonctionAgent">Fonction</label>
                                                <small id="errorfonctionAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" name="loginAgent" id="loginAgent" type="text" value={user.loginAgent} required onChange={(event) => myChangeHandler(event)} />
                                                <label htmlFor="loginAgent">Login</label>
                                                <small id="errorloginAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input className="form-control" name="nomAgent" id="nomAgent" type="text" value={user.nomAgent} required onChange={(event) => myChangeHandler(event)} />
                                                <label htmlFor="nomAgent">Nom</label>
                                                <small id="errornomAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating">
                                                <input className="form-control" name="prenomAgent" id="prenomAgent" type="text" value={user.prenomAgent} required onChange={(event) => myChangeHandler(event)} />
                                                <label htmlFor="prenomAgent">Prénom</label>
                                                <small id="errorprenomAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" name="emailAgent" id="emailAgent" type="email" value={user.emailAgent} required onChange={(event) => myChangeHandler(event)}  />
                                                <label htmlFor="emailAgent">Adresse e-mail</label>
                                                <small id="erroremailAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="telAgent" name="telAgent" type="text" value={user.telAgent} required onChange={(event) => myChangeHandler(event)} />
                                                <label htmlFor="telAgent">Téléphone</label>
                                                <small id="errortelAgent" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <button type="button" className="btn text-white btn-primary" onClick={ () => (setShowpassword(!showpassword),setUser({...user,'mdpAgent': ''})) } data-toggle="button">{ showpassword ? "Annuler la Modification du mot de passe":"Modifier le mot de passe" }</button>
                                    </div>
                                    {
                                        showpassword ? 
                                        (
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" name="mdpAgent" id="mdpAgent" type="password" value={ showpassword ? user.mdpAgent:""} required onChange={(event) => myChangeHandler(event)} autoComplete="on" />
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
                                        ):""
                                    }
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/utilisateur">Annuler</Link>
                                        <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => updateUserConfrime()} data-toggle="button">Confirmer</button>
                                    </div>
                                </div>
                            </form>
                        ):(<p></p>)
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures,
        apiLoadingProfiles: state.profileReducer.loadingProfile,
        apiDataProfiles: state.profileReducer.profiles,
        apiLoadingUsers: state.userReducer.loadingUser,
        apiDataUsers: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (id,user) => dispatch(updateUser(id,user)),
        getAllProfiles: ()   => dispatch(getAllProfiles()),
        getAllStructures: ()   => dispatch(getAllStructures()),
        getAllUsers: () => dispatch(getAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);