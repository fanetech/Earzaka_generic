import React, { useEffect } from 'react';
import { DataTable } from "simple-datatables";

const Transactionoftype = () => {
    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }
    })

    const transactionoftype = [
        'PAYMENT',
        'P2P',
        'CASHOUT',
        'CASHIN',
        'TOPUP' 
    ];

    
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Type de transaction</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Type de transaction</li>
                </ol>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { transactionoftype.length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        transactionoftype.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={index}>
                                                    <td>{index}</td>
                                                    <td>{data}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucun type de transaction</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Transactionoftype;
