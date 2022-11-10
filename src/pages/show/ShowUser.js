import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUsers } from '../../redux/user/userAction';
import { getAllProfiles } from '../../redux/profile/profileAction';
import { getAllStructures } from '../../redux/structure/structureAction';

const ShowUser = ({ getAllProfiles, getAllStructures, apiLoadingStructures, apiDataStructures, apiLoadingProfiles, apiDataProfiles, apiLoadingUsers, apiDataUsers, getAllUsers }) => {

    let { id } = useParams();

    const [user, setUser] = useState({ 'idStructure': '','idProfilAgent': '','fonctionAgent': '','loginAgent': '','nomAgent': '','prenomAgent': '','emailAgent': '','telAgent': '','mdpAgent': '' });

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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Utilisateurs</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Afficher l'utilisateur</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                    { (apiLoadingProfiles && Object.keys(apiDataProfiles).length > 0) && (apiLoadingStructures && Object.keys(apiDataStructures).length > 0) ?
                        (
                            <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                <div className="row mb-3 text-center">
                                    <div className="col-md-4">
                                        <h6>Structure : </h6>{apiDataStructures.filter(data => data.idStructure == user.idStructure)[0].nomStructure}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Profil : </h6>{apiDataProfiles.filter(data => data.idProfilAgent == user.idProfilAgent)[0].libelleProfilAgent}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Fonction : </h6>{user.fonctionAgent}
                                    </div>
                                </div>
                                <div className="row mb-3 text-center">
                                    <div className="col-md-4">
                                        <h6>Pseudo : </h6>{user.loginAgent}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Nom : </h6>{user.nomAgent}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Prénom : </h6>{user.prenomAgent}
                                    </div>
                                </div>
                                <div className="row mb-3 text-center">
                                    <div className="col-md-4">
                                        <h6>Adresse e-mail : </h6>{user.emailAgent}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Téléphone : </h6>{user.telAgent}
                                    </div>
                                    <div className="col-md-4">
                                        <h6>Statut : </h6>{user.statut ? "Active" : "Désactive"}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-2 p-2">
                                    <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/utilisateur">Retour</Link>
                                </div>
                            </div>
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
        getAllProfiles: ()   => dispatch(getAllProfiles()),
        getAllStructures: ()   => dispatch(getAllStructures()),
        getAllUsers: () => dispatch(getAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);