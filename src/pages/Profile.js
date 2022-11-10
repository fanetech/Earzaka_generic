import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from "simple-datatables";
import { connect } from 'react-redux';
import { getAllProfiles, deleteProfile, updateProfile } from '../redux/profile/profileAction';
import Swal from 'sweetalert2';
import $ from 'jquery';


const Profile = ({ getAllProfiles, apiDataProfiles, apiLoadingProfiles, deleteProfile, updateProfile }) => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingProfiles) {
            getAllProfiles();
        }
    })

    $(document).ready(function() {
        
        $("#datatablesSimple").on("click", ".action_event_supprimer_profil", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataProfiles.filter(data => data.idProfilAgent == id);
            setProfile(dataUpdate[0])
            $('#id_modal_button_delete_profil').click();
        });

        $("#datatablesSimple").on("click", ".action_event_modifier_profil", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataProfiles.filter(data => data.idProfilAgent == id);
            setProfile(dataUpdate[0])
            $('#id_modal_button_update_profil').click();
        });

        $("#datatablesSimple").on("click", ".action_event_statut_profil", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataProfiles.filter(data => data.idProfilAgent == id);
            setProfile({
                "idProfilAgent": dataUpdate[0].idProfilAgent,
                "libelleProfilAgent": dataUpdate[0].libelleProfilAgent,
                "statut": (dataUpdate[0].statut) ? false:true,
                "dateCree": dataUpdate[0].dateCree
            });
            $('#id_modal_button_update_statut_profil').click();
        });
    })

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setProfile({
            ...profile,
            [nam]: val
        });
    }

    const updateProfileConfrime = async () => {
        if(profile.libelleProfilAgent.length < 2){
            document.getElementById("errorLibelleProfilAgent").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (await updateProfile(profile.idProfilAgent,profile)) {
                Swal.fire({
                    text: "Le profil a étè modifier.",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.reload();
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
    
    const deleteProfileConfrime = async () => {
        if (await deleteProfile(profile.idProfilAgent) == true) {
            Swal.fire({
                text: "Le profil a étè Supprimer.",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            }).then(function (result) {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }else{
            Swal.fire({
                text: "Le profil est associé à un utilisateur.",
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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Profil</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Profil</li>
                </ol>
                {/* <div className="mb-4">
                    <Link data-bs-placement="top" title="Ajouter" className="fs-2" type="button" to="/ajouter-profil"><i className="fas fa-plus"></i></Link>
                </div> */}
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    {apiLoadingProfiles && Object.keys(apiDataProfiles).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        {/* <th>Statut</th> */}
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        {/* <th>Statut</th> */}
                                        {/* <th></th> */}
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataProfiles.map((data, index) => {
                                            index = index + 1;
                                            return (
                                                <tr className="text-center" key={data.idProfilAgent}>
                                                    <td>{index}</td>
                                                    <td>{data.libelleProfilAgent}</td>
                                                    {/* <td><a data-id={data.idProfilAgent} type="button" className="fs-5 text-primary action_event_statut_profil" style={{ color: 'inherit', textDecoration: 'none' }}><span className={data.statut ? "badge bg-success" : "badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span></a></td> */}
                                                    {/* <td className='d-flex justify-content-around'>
                                                        {
                                                            index <5 ? 
                                                            "":
                                                            (
                                                                <>
                                                                    <a data-id={data.idProfilAgent} type="button" className="fs-5 text-warning action_event_modifier_profil" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></a>
                                                                    <a data-id={data.idProfilAgent} type="button" className="fs-5 text-danger action_event_supprimer_profil" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                                </>
                                                            )
                                                        }
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ) :
                        (
                            <h3 className="text-center">Aucun profil</h3>
                        )
                    }
                </div>
            </div>

            <button id="id_modal_button_delete_profil" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_profil"></button>
            <div className="modal fade" id="exampleModal_profil" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(profile != null) ? 'Voulez vous supprimer le '+profile.libelleProfilAgent:"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteProfileConfrime()} className="btn text-white">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="id_modal_button_update_profil" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1_profil"></button>
            <div className="modal fade" id="exampleModal1_profil" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Modification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-sm-12 col-md-12 mb-2">
                                <div className="form-group">
                                    <label>Libelle</label>
                                    <input type="text" className="form-control mt-2" name="libelleProfilAgent" value={(profile != null) ? profile.libelleProfilAgent:''} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errorLibelleProfilAgent" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateProfileConfrime() } className="btn text-white">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="id_modal_button_update_statut_profil" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2_profil"></button>
            <div className="modal fade" id="exampleModal2_profil" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Statut</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(profile != null) ? 'Voulez vous '+(profile.statut ? "Active "+profile.libelleProfilAgent : "Désactive "+profile.libelleProfilAgent):"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateProfileConfrime()} className="btn text-white">{ profile ? (profile.statut ? "Active" : "Désactive"):'...'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingProfiles: state.profileReducer.loadingProfile,
        apiDataProfiles: state.profileReducer.profiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProfiles: () => dispatch(getAllProfiles()),
        updateProfile: (id,profile) => dispatch(updateProfile(id,profile)),
        deleteProfile: (id) => dispatch(deleteProfile(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
