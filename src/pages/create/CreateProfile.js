import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../redux/profile/profileAction';
import Swal from 'sweetalert2';

const CreateProfile = ({ createProfile }) => {

    const [profile, setProfile] = useState({ 'libelleProfilAgent': '' });

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setProfile({
            ...profile,
            [nam]: val
        });
    }

    const createProfileConfrime = async () => {
        if(profile.libelleProfilAgent.length < 2){
            document.getElementById("errorLibelleProfilAgent").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (await createProfile(profile)) {
                Swal.fire({
                    text: "Un nouveau profil a étè ajouter.",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.pathname = "/profil";
                    }
                });
            }else{
                Swal.fire({
                    text: "Le libelle est déja utilisé. Veuillez vérifier les informations saisies.",
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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Profil</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau profil</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-50">
                    <div className="card-body">
                        <div className="col-sm-12 col-md-12 mb-2">
                            <div className="form-group">
                                <label>Libelle <span className="text-danger">*</span> :</label>
                                <input type="text" className="form-control mt-2" name="libelleProfilAgent" value={profile.libelleProfilAgent} required onChange={(event) => myChangeHandler(event)} />
                                <small id="errorLibelleProfilAgent" className="text-danger"></small>
                            </div>
                            <div className="d-flex justify-content-center mt-2 p-2">
                                <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/profil">Annuler</Link>
                                <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => createProfileConfrime()} data-toggle="button">Confirmer</button>
                            </div>
                        </div>
                    </div>
                </div>
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
        createProfile: (profile) => dispatch(createProfile(profile))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProfile);