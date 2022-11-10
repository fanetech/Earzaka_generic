import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllLiquidations } from '../redux/liquidation/liquidationAction';
import { getAllUsers } from '../redux/user/userAction';
import { DataTable } from "simple-datatables";
import moment from "moment";
import methods from '../constant';

const Liquidation = ({ apiLoadingLiquidations, apiDataLiquidations, apiLoadingUsers, apiDataUsers, getAllLiquidations, getAllUsers}) => {

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
    })

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Liquidation</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Liquidation</li>
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
                    { apiLoadingLiquidations && Object.keys(apiDataLiquidations).length > 0 && apiLoadingUsers && Object.keys(apiDataUsers).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th>Référence</th>
                                        <th>Utilisateur</th>
                                        <th>Téléphone du Client</th>
                                        <th>Service</th>
                                        <th>Montant</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Référence</th>
                                        <th>Utilisateur</th>
                                        <th>Téléphone du Client</th>
                                        <th>Service</th>
                                        <th>Montant</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataLiquidations.map((data,index) => {
                                            console.log(data)
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idLiq}>
                                                    <td>{data.refLiq}</td>
                                                    <td>{ apiDataUsers.filter(dataUser => dataUser.idAgent == data.idAgent)[0].nomAgent+" "+apiDataUsers.filter(dataUser => dataUser.idAgent == data.idAgent)[0].prenomAgent }</td>
                                                    <td>{data.numTelClient}</td>
                                                    <td>
                                                        <ul>
                                                            {
                                                                data.servicesLiq.map((datasL) => {
                                                                    return <li key={datasL.idService}><h6>{ datasL.nomService}</h6>{datasL.montantService } F CFA</li>
                                                                })
                                                            }
                                                        </ul>
                                                    </td>
                                                    <td><h6>{data.montantLiq} F CFA</h6></td>
                                                    <td>{moment(data.dateLiq).format('DD/MM/YYYY à HH:mm')}</td>
                                                    <td>
                                                        <Link to={"/afficher-utilisateur/"+data.idAgent} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>    
                                                    </td>
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
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingLiquidations: state.liquidationReducer.loadingLiquidation,
        apiDataLiquidations: state.liquidationReducer.liquidations,
        apiLoadingUsers: state.userReducer.loadingUser,
        apiDataUsers: state.userReducer.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLiquidations: ()         => dispatch(getAllLiquidations()),
        getAllUsers: () => dispatch(getAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Liquidation);
