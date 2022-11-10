import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import { connect } from 'react-redux';
import { getAllStructures } from '../redux/structure/structureAction';
import { getAllProfiles } from '../redux/profile/profileAction';
import { getAllUsers, deleteUser, updateUser } from '../redux/user/userAction';
import $ from 'jquery';
import methods from '../constant';


const User = ({ apiLoadingStructures, apiDataStructures, apiLoadingProfiles, apiDataProfiles, apiLoadingUsers, apiDataUsers, getAllStructures, getAllProfiles, getAllUsers, deleteUser, updateUser }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingProfiles) {
            getAllProfiles();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }

        if (!apiLoadingUsers) {
            getAllUsers();
        }
    })

    $(document).ready(function() {
        
        $("#datatablesSimple").on("click", ".action_event_supprimer_user", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataUsers.filter(data => data.idAgent == id);
            setUser(dataUpdate[0])
            $('#id_modal_button_delete_user').click();
        });

        $("#datatablesSimple").on("click", ".action_event_statut_user", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataUsers.filter(data => data.idAgent == id);
            setUser({
                ...dataUpdate[0],
                'statut': (dataUpdate[0].statut) ? false:true,
                'mdpAgent': null
            });
            $('#id_modal_button_update_statut_user').click();
        });
    })

    const deleteUserConfrime = () => {
        if (deleteUser(user.idAgent)) {
            window.location.reload();
        }
    }

    const updateUserConfrime = () => {
        if (updateUser(user.idAgent,user)) {
            window.location.pathname = "/utilisateur";
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Utilisateurs</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Utilisateurs</li>
                </ol>
                <div className="mb-4">
                    <Link data-bs-placement="top" title="Ajouter" className="fs-2" type="button" to="/ajouter-utilisateur"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                {   (apiLoadingProfiles && Object.keys(apiDataProfiles).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 && apiLoadingUsers && Object.keys(apiDataUsers).length > 0) ?
                    (
                        <table id="datatablesSimple" className="table-striped">
                            <thead className="text-white" style={{ background: "#033d7c" }}>
                                <tr>
                                    <th className="width-table">Numéro</th>
                                    <th>Structure</th>
                                    <th>Profil</th>
                                    <th>Pseudo</th>
                                    {/* <th>Statut</th> */}
                                    <th>Date de création</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th className="width-table">Numéro</th>
                                    <th>Structure</th>
                                    <th>Profil</th>
                                    <th>Pseudo</th>
                                    {/* <th>Statut</th> */}
                                    <th>Date de création</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {
                                    methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général" ?
                                        apiDataUsers.map((data, index) => {
                                            index = index + 1;
                                            return (
                                                <tr className="text-center" key={data.idAgent}>
                                                    <td>{index}</td>
                                                    <td>{apiDataStructures.filter(datast => datast.idStructure == data.idStructure)[0].nomStructure}</td>
                                                    <td>{apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent}</td>
                                                    <td>{data.loginAgent}</td>
                                                    {/* <td><a data-id={data.idAgent} type="button" className="fs-5 text-primary action_event_statut_user" style={{ color: 'inherit', textDecoration: 'none' }}><span className={data.statut ? "badge bg-success" : "badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span></a></td> */}
                                                    <td>{new Date(data.dateCree).toLocaleString('fr')}</td>
                                                    <td className='d-flex justify-content-around'>
                                                        <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                        <Link to={"/modifier-utilisateur/"+data.idAgent} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                        <a data-id={data.idAgent} type="button" className="fs-5 text-danger action_event_supprimer_user" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>      
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                            methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur" ?
                                                apiDataUsers.filter(dataRg => dataRg.idRegie==methods.dataUser().idRegie).map((data, index) => {
                                                    index = index + 1;
                                                    return (
                                                        <tr className="text-center" key={data.idAgent}>
                                                            <td>{index}</td>
                                                            <td>{apiDataStructures.filter(datast => datast.idStructure == data.idStructure)[0].nomStructure}</td>
                                                            <td>{apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent}</td>
                                                            <td>{data.loginAgent}</td>
                                                            {/* <td>
                                                                {
                                                                    (apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent.toLowerCase() == "administrateur général") ?
                                                                    (
                                                                        <span className={data.statut ? "fs-6 badge bg-success" : "fs-6 badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span>
                                                                    ):(
                                                                        <a data-id={data.idAgent} type="button" className="fs-5 text-primary action_event_statut_user" style={{ color: 'inherit', textDecoration: 'none' }}><span className={data.statut ? "badge bg-success" : "badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span></a>
                                                                    )
                                                                }   
                                                            </td> */}
                                                            <td>{new Date(data.dateCree).toLocaleString('fr')}</td>
                                                            <td className='d-flex justify-content-around'>
                                                                {
                                                                    (apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent.toLowerCase() == "administrateur général") ?
                                                                    (
                                                                        <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                    )
                                                                    :
                                                                    (
                                                                        <>
                                                                            <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                            <Link to={"/modifier-utilisateur/"+data.idAgent} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                            <a data-id={data.idAgent} type="button" className="fs-5 text-danger action_event_supprimer_user" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                                        </>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                apiDataUsers.filter(dataRg => dataRg.idStructure==methods.dataUser().idStructure).map((data, index) => {
                                                    index = index + 1;
                                                    return (
                                                        <tr className="text-center" key={data.idAgent}>
                                                            <td>{index}</td>
                                                            <td>{apiDataStructures.filter(datast => datast.idStructure == data.idStructure)[0].nomStructure}</td>
                                                            <td>{apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent}</td>
                                                            <td>{data.loginAgent}</td>
                                                            {/* <td>
                                                                {
                                                                    (apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent.toLowerCase() == "administrateur général" || apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent.toLowerCase() == "administrateur") ?
                                                                    (
                                                                        <span className={data.statut ? "fs-6 badge bg-success" : "fs-6 badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span>
                                                                    ):(
                                                                        methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire" ?
                                                                        <span className={data.statut ? "fs-6 badge bg-success" : "fs-6 badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span>
                                                                        :<a data-id={data.idAgent} type="button" className="fs-5 text-primary action_event_statut_user" style={{ color: 'inherit', textDecoration: 'none' }}><span className={data.statut ? "badge bg-success" : "badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span></a>
                                                                    )
                                                                }   
                                                            </td> */}
                                                            <td>{new Date(data.dateCree).toLocaleString('fr')}</td>
                                                            <td className='d-flex justify-content-around'>
                                                                {
                                                                    (apiDataProfiles.filter(datapr => datapr.idProfilAgent == data.idProfilAgent)[0].libelleProfilAgent.toLowerCase() == "administrateur général") ?
                                                                    (
                                                                        <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                    )
                                                                    :
                                                                    (
                                                                        methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire" ?
                                                                        (
                                                                            <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                        ):(
                                                                            <>
                                                                                <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                                <Link to={"/modifier-utilisateur/"+data.idAgent} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                                <a data-id={data.idAgent} type="button" className="fs-5 text-danger action_event_supprimer_user" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                                            </>
                                                                        )
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                }
                            </tbody>
                        </table>
                    ): (
                         <h3 className="text-center">Aucun utilisateur</h3>
                    )
                }
                </div>
            </div>

            <button id="id_modal_button_delete_user" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_user"></button>
            <div className="modal fade" id="exampleModal_user" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(user != null) ? 'Voulez vous supprimer le '+user.loginAgent:"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteUserConfrime()} className="btn text-white">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="id_modal_button_update_statut_user" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2_user"></button>
            <div className="modal fade" id="exampleModal2_user" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Statut</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(user != null) ? 'Voulez vous '+(user.statut ? "Active "+user.loginAgent : "Désactive "+user.loginAgent):"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateUserConfrime()} className="btn text-white">{ user ? (user.statut ? "Active" : "Désactive"):'...'}</button>
                        </div>
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
        getAllStructures: ()   => dispatch(getAllStructures()),
        getAllProfiles: () => dispatch(getAllProfiles()),
        getAllUsers: () => dispatch(getAllUsers()),
        deleteUser: (id) => dispatch(deleteUser(id)),
        updateUser: (id,user) => dispatch(updateUser(id,user)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);