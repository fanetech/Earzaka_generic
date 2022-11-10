import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllEvaluations } from '../redux/evaluation/evaluationAction';
import { getAllUsers } from '../redux/user/userAction';
import { getAllGoverneds } from '../redux/governed/governedAction';
import { getAllStructures } from '../redux/structure/structureAction';
import { DataTable } from "simple-datatables";
import moment from "moment";
import methods from '../constant';

const Evaluation = ({ apiLoadingEvaluations, apiDataEvaluations, apiLoadingUsers, apiDataUsers, apiLoadingGoverneds, apiDataGoverneds, apiLoadingStructures, apiDataStructures, getAllEvaluations, getAllUsers, getAllGoverneds, getAllStructures }) => {

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingEvaluations) {
            getAllEvaluations();
        }

        if (!apiLoadingUsers) {
            getAllUsers();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }

        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }
    })

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Evaluation</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Evaluation</li>
                </ol>
                <div className="mb-4">
                    {
                        (methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire") ?
                        (
                            <Link data-bs-placement="top" title="Ajouter" className="btn rounded-pill text-white" style={{ background: "#033d7c" }} type="button" to="/ajouter-liquidation">Effectuer une Liquidation</Link>
                        ):""
                    }
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { apiLoadingEvaluations && Object.keys(apiDataEvaluations).length > 0 && apiLoadingUsers && Object.keys(apiDataUsers).length > 0  &&  apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th>Régie</th>
                                        <th>Structure</th>
                                        <th>Utilisateur</th>
                                        <th>Demande</th>
                                        <th>Statut</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Régie</th>
                                        <th>Structure</th>
                                        <th>Utilisateur</th>
                                        <th>Demande</th>
                                        <th>Statut</th>
                                        <th>Date</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataEvaluations.map((data,index) => {
                                            console.log(apiDataUsers)
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idEval}>
                                                    <td>{apiDataGoverneds.filter(datarg => datarg.idRegie == data.idRegie)[0].libelleRegie}</td>
                                                    <td>{apiDataStructures.filter(datarg => datarg.idStructure == data.idStructure)[0].nomStructure}</td>
                                                    <td>{apiDataUsers.filter(datarg => datarg.idAgent == data.idAgent)[0].nomAgent+" "+apiDataUsers.filter(datarg => datarg.idAgent == data.idAgent)[0].prenomAgent}</td>
                                                    <td>{data.idDmd}</td>
                                                    <td>{data.etatEval}</td>
                                                    <td>{moment(data.dateEval).format('DD/MM/YYYY à HH:mm')}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucun evaluation</h3>
                        )
                    }       
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingEvaluations: state.evaluationReducer.loadingEvaluation,
        apiDataEvaluations: state.evaluationReducer.evaluations,
        apiLoadingUsers: state.userReducer.loadingUser,
        apiDataUsers: state.userReducer.users,
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds: state.governedReducer.governeds,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllEvaluations: ()         => dispatch(getAllEvaluations()),
        getAllUsers: () => dispatch(getAllUsers()),
        getAllGoverneds: ()         => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Evaluation);
