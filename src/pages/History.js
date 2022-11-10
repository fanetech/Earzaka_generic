import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllLiquidations } from '../redux/liquidation/liquidationAction';
import { getAllUsers } from '../redux/user/userAction';
import { getAllEvaluations } from '../redux/evaluation/evaluationAction';
import { getAllGoverneds } from '../redux/governed/governedAction';
import { getAllStructures } from '../redux/structure/structureAction';
import { DataTable } from "simple-datatables";
import moment from "moment";

const History = ({ apiLoadingLiquidations, apiDataLiquidations, getAllLiquidations,  apiLoadingUsers, apiDataUsers, getAllUsers, apiLoadingEvaluations, apiDataEvaluations, apiLoadingGoverneds, apiDataGoverneds, apiLoadingStructures, apiDataStructures, getAllEvaluations, getAllGoverneds, getAllStructures}) => {

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingLiquidations) {
            getAllLiquidations();
        }

        if (!apiLoadingUsers) {
            getAllUsers();
        }

        if (!apiLoadingEvaluations) {
            getAllEvaluations();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }

        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }
    })

    return (
        <div className="container px-4">
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="mt-4">Historique</h1>
            </div>
            <div className="card mb-4">
                <div className="card-body"> 
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-liquidation-tab" data-bs-toggle="tab" data-bs-target="#nav-liquidation" type="button" role="tab" aria-controls="nav-liquidation" aria-selected="true">Liquidation</button>
                            <button class="nav-link" id="nav-evaluation-tab" data-bs-toggle="tab" data-bs-target="#nav-evaluation" type="button" role="tab" aria-controls="nav-evaluation" aria-selected="false">Evaluation</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-liquidation" role="tabpanel" aria-labelledby="nav-liquidation-tab">
                            <div className="d-flex align-items-center justify-content-end">
                                <div className="mb-4 mt-4">
                                    <Link data-bs-placement="top" title="Ajouter" className="btn rounded-pill text-white" style={{ background: "#033d7c" }} type="button" to="/effectuerliquidation">Effectuer une Liquidation</Link>
                                </div>
                            </div>
                            { 
                                apiLoadingLiquidations && Object.keys(apiDataLiquidations).length > 0 && apiLoadingUsers && Object.keys(apiDataUsers).length > 0 ?
                                (
                                    <table id="datatablesSimple" className="table-striped">
                                        <thead className="text-white" style={{ background: "#033d7c" }}>
                                            <tr>
                                                <th className="width-table">Numéro</th>
                                                <th>Utilisateur</th>
                                                <th>Téléphone du Client</th>
                                                <th>Référence</th>
                                                <th>Montant</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th className="width-table">Numéro</th>
                                                <th>Utilisateur</th>
                                                <th>Téléphone du Client</th>
                                                <th>Référence</th>
                                                <th>Montant</th>
                                                <th>Date</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {
                                                apiDataLiquidations.map((data,index) => {
                                                    index = index+1;
                                                    return(
                                                        <tr className="text-center" key={data.idLiq}>
                                                            <td>{index}</td>
                                                            <td>{ apiDataUsers.filter(dataUser => dataUser.idAgent == data.idAgent)[0].nomAgent+" "+apiDataUsers.filter(dataUser => dataUser.idAgent == data.idAgent)[0].prenomAgent }</td>
                                                            <td>{data.numTelClient}</td>
                                                            <td>{data.refLiq}</td>
                                                            <td>{data.montantLiq}</td>
                                                            <td>{moment(data.dateLiq).format('DD/MM/YYYY à HH:mm')}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ):
                                (
                                    <h3 className="text-center">Aucune liquidation</h3>
                                )
                            }
                        </div>
                        <div class="tab-pane fade" id="nav-evaluation" role="tabpanel" aria-labelledby="nav-evaluation-tab">
                            <div className="d-flex align-items-center justify-content-end">
                                <div className="mb-4 mt-4">
                                    <Link data-bs-placement="top" title="Ajouter" className="btn rounded-pill text-white" style={{ background: "#033d7c" }} type="button" to="/effectuerdemandeevaluation">Effectuer une Evaluation</Link>
                                </div>
                            </div>
                            { 
                                apiLoadingEvaluations && Object.keys(apiDataEvaluations).length > 0 && apiLoadingUsers && Object.keys(apiDataUsers).length > 0  &&  apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 ?
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingLiquidations: state.liquidationReducer.loadingLiquidation,
        apiDataLiquidations: state.liquidationReducer.liquidations,
        apiLoadingUsers: state.userReducer.loadingUser,
        apiDataUsers: state.userReducer.users,
        apiLoadingEvaluations: state.evaluationReducer.loadingEvaluation,
        apiDataEvaluations: state.evaluationReducer.evaluations,
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds: state.governedReducer.governeds,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLiquidations: ()         => dispatch(getAllLiquidations()),
        getAllUsers: () => dispatch(getAllUsers()),
        getAllEvaluations: ()         => dispatch(getAllEvaluations()),
        getAllGoverneds: ()         => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
