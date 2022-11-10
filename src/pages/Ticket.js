import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import { connect } from 'react-redux';
import { getAllTickets, deleteTicket } from '../redux/ticket/ticketAction';
import { getAllPointofservices } from '../redux/pointofservice/pointofserviceAction';
import $ from 'jquery';
import Swal from 'sweetalert2';


const Ticket = ({ getAllTickets, apiLoadingTickets, apiDataTickets, apiLoadingPointofservices, apiDataPointofservices, deleteTicket, getAllPointofservices }) => {

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingPointofservices) {
            getAllPointofservices();
        }

        if (!apiLoadingTickets) {
            getAllTickets();
        }
    })

    const [guichet, setStructure] = useState(null);
    
    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer_ticket", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataTickets.filter(data => data.idGuichet == id);
            setStructure(dataUpdate[0])
            $('#id_modal_button_delete_ticket').click();
        });
    })

    const deleteStructureConfrime = () => {
        if (deleteTicket(guichet.idGuichet)) {
            Swal.fire({
                text: "Le guichet a étè Supprimer.",
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
            <h1 className="mt-4">Guichet</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Guichet</li>
                </ol>
                <div className="mb-4">
                    <Link to={"/ajouter-guichet"} data-bs-placement="top" title="Ajouter" className="fs-2" type="button"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { (apiLoadingPointofservices && Object.keys(apiDataPointofservices).length > 0 && apiLoadingTickets && Object.keys(apiDataTickets).length > 0 ) ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th style={{width: "10%"}} data-sortable>Numéro</th>
                                        <th>Point de service</th>
                                        <th>Libelle</th>
                                        <th>Téléphone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                    <th style={{width: "10%"}} data-sortable>Numéro</th>
                                        <th>Point de service</th>
                                        <th>Libelle</th>
                                        <th>Téléphone</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataTickets.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idGuichet}>
                                                    <td>{index}</td>
                                                    <td>{apiDataPointofservices.filter(datarg => datarg.idPS == data.idPS)[0].libellePS}</td>
                                                    <td>{data.libelleGuichet}</td>
                                                    <td>{data.telGuichet}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link to={"/afficher-guichet/"+data.idGuichet} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                            <Link to={"/modifier-guichet/"+data.idGuichet} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                            <a data-id={data.idGuichet} type="button" className="fs-5 text-danger action_event_supprimer_ticket" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
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
                            <h3 className="text-center">Aucun guichet</h3>
                        )
                    }
                </div>
            </div>

            <button id="id_modal_button_delete_ticket" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(guichet != null) ? 'Voulez vous supprimer le guichet '+guichet.libelleGuichet:"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteStructureConfrime() } className="btn text-white">Supprimer</button>
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
        apiDataPointofservices: state.pointofserviceReducer.pointofservices,
        apiLoadingTickets: state.ticketReducer.loadingTicket,
        apiDataTickets: state.ticketReducer.tickets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTicket: (id) => dispatch(deleteTicket(id)),
        getAllPointofservices: ()   => dispatch(getAllPointofservices()),
        getAllTickets: ()   => dispatch(getAllTickets()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
