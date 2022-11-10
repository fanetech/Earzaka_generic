import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import {LineChart} from 'react-light-chart';
import methods from '../constant';


const Dashboard = () => {

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }
    })

    const style = {width: "100%", height: 400};
    const data = [11, 12, 5, 3, 6, 9, 8, 7, 5, 2, 1, undefined, 4, undefined, 6, 5, 3, 2, 5];

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Tableau de bord</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="mb-4">
                    {
                        (methods.dataUser().nomProfilAgent.toLowerCase() == "gestionnaire") ?
                        (
                            <>
                                <Link data-bs-placement="top" title="Ajouter" className="btn rounded-pill text-white" style={{ background: "#033d7c" }} type="button" to="/ajouter-liquidation">Effectuer une Liquidation</Link>
                            </>
                        ):""
                    }
                </div>
            </div>
            <div className="row">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Transaction
                    </div>
                    <div className="card-body">
                        <LineChart data={data} style={style} className="foo"/>
                    </div>
                </div>
            </div>
        </div>
   )
}

export default Dashboard