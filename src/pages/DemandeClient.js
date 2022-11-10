import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllDemandedemandeevaluations } from '../redux/demandeevaluation/demandeevaluationAction';
import { getAllServices } from '../redux/service/serviceAction';
import { DataTable } from "simple-datatables";
import moment from "moment";
import methods from '../constant';

const DemandeClient = ({ apiLoadingDemandeevaluation, apiDataDemandeevaluation, apiLoadingServices, apiDataServices, getAllDemandedemandeevaluations, getAllServices}) => {

    useEffect(() => {

        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }
            
        if (!apiLoadingDemandeevaluation) {
            getAllDemandedemandeevaluations();
        }

        if (!apiLoadingServices) {
            getAllServices();
        }
    })

    return (
        <div className="container px-4">
            <h1 className="mt-4 mb-4">Demande d'evaluation</h1>
            <div className="card mb-4">
                <div className="card-body">
                    { apiLoadingDemandeevaluation && Object.keys(apiDataDemandeevaluation).length > 0 && apiLoadingServices && Object.keys(apiDataServices).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Service</th>
                                        <th>Téléphone du Client</th>
                                        <th>Date</th>
                                        <th className="text-end"></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th className="width-table">Numéro</th>
                                        <th>Service</th>
                                        <th>Téléphone du Client</th>
                                        <th>Date</th>
                                        <th className="text-end"></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataDemandeevaluation.map((data,index) => {
                                            console.log(data.date)
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={index}>
                                                    <td>{index}</td>
                                                    <td>{apiDataServices.filter(datarg => datarg.id == data.serviceId)[0].labels[0]}</td>
                                                    <td>{data.userPhoneNumber}</td>
                                                    <td>{moment(data.date).format('DD/MM/YYYY à HH:mm')}</td>
                                                    <td className="text-end">
                                                        <Link to={"/traitedemandeevaluation/"+data.id} type="button" className="btn btn-sm btn-primary text-white" style={{ color: 'inherit', textDecoration: 'none' }}>Traiter</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucune demande d'evaluation</h3>
                        )
                    }       
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingDemandeevaluation: state.demandeevaluationReducer.loadingDemandeevaluation,
        apiDataDemandeevaluation: state.demandeevaluationReducer.demandeevaluations,
        apiLoadingServices: state.serviceReducer.loadingService,
        apiDataServices: state.serviceReducer.services
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDemandedemandeevaluations: ()         => dispatch(getAllDemandedemandeevaluations()),
        getAllServices: () => dispatch(getAllServices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemandeClient);
