import React, { useEffect, useState } from 'react';
import {DataTable} from "simple-datatables";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPointofservices, deletePointofservice } from '../redux/pointofservice/pointofserviceAction';
import $ from 'jquery';
import Swal from 'sweetalert2';

const Pointofservice = ({getAllPointofservices, deletePointofservice, apiLoadingPointofservices, apiDataPointofservices}) => {
    const [pointofservice, setPointofservice] = useState(null);
    
    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingPointofservices) {
            getAllPointofservices();
        }
    })

    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer_pointofservice", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataPointofservices.filter(data => data.idPS == id);
            setPointofservice(dataUpdate[0]);
            $('#id_modal_button_delete_pointofservice').click();
        });
    })

    const deletePointofserviceConfrime = () => {
        if (deletePointofservice(pointofservice.idPS)) {
            Swal.fire({
                text: "Le point de service a étè Supprimer.",
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
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Point de Service</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Point de Service</li>
                </ol>
                <div className="mb-4">
                    <Link to={"/ajouter-pointdeservice"} data-bs-placement="top" title="Ajouter" className="fs-2" type="button"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { (apiLoadingPointofservices && Object.keys(apiDataPointofservices).length > 0 ) ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        <th>Responsable</th>
                                        <th>Numéro du compte</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        <th>Responsable</th>
                                        <th>Numéro du compte</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataPointofservices.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idPS}>
                                                    <td>{index}</td>
                                                    <td>{data.libellePS}</td>
                                                    <td>{data.respPS}</td>
                                                    <td>{data.numCptePS}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link to={"/afficher-pointdeservice/"+data.idPS} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                            <Link to={"/modifier-pointdeservice/"+data.idPS} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                            <a data-id={data.idPS} type="button" className="fs-5 text-danger action_event_supprimer_pointofservice" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucun point de service</h3>
                        )
                    }
                </div>

                <button id="id_modal_button_delete_pointofservice" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {(pointofservice != null) ? 'Voulez vous supprimer le point de service '+pointofservice.libellePS+' ?':"..."}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="button" style={{ background: "#033d7c" }} onClick={() => deletePointofserviceConfrime() } className="btn text-white">Supprimer</button>
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
        apiLoadingPointofservices: state.pointofserviceReducer.loadingPointofservice,
        apiDataPointofservices: state.pointofserviceReducer.pointofservices
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePointofservice: (id)   => dispatch(deletePointofservice(id)),
        getAllPointofservices: ()   => dispatch(getAllPointofservices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pointofservice);