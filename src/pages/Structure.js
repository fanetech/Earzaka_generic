import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import { connect } from 'react-redux';
import { getAllStructures, deleteStructure } from '../redux/structure/structureAction';
import { getAllGoverneds } from '../redux/governed/governedAction';
import $ from 'jquery';
import Swal from 'sweetalert2';
import moment from "moment";
import methods from '../constant';



const Structure = ({ getAllStructures, apiLoadingStructures, apiDataStructures, apiLoadingGoverneds, apiDataGoverneds, deleteStructure, getAllGoverneds }) => {

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }

        if (!apiLoadingStructures) {
            getAllStructures();
        }
    })

    const [structure, setStructure] = useState(null);
    
    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer_structure", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataStructures.filter(data => data.idStructure == id);
            setStructure(dataUpdate[0])
            $('#id_modal_button_delete_structure').click();
        });
    })

    const deleteStructureConfrime = () => {
        if (deleteStructure(structure.idStructure)) {
            Swal.fire({
                text: "La structure a étè Supprimer.",
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
            <h1 className="mt-4">Structure</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Structure</li>
                </ol>
                <div className="mb-4">
                <Link data-bs-placement="top" title="Ajouter" className="fs-2" type="button" to="/ajouter-structure"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { (apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 ) ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th style={{width: "10%"}} data-sortable>Numéro</th>
                                        <th>Régie</th>
                                        <th>Nom de la structure</th>
                                        <th>Localité</th>
                                        <th>Date de création</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th style={{width: "10%"}} data-sortable>Numéro</th>
                                        <th>Régie</th>
                                        <th>Nom de la structure</th>
                                        <th>Localité</th>
                                        <th>Date de création</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général" ?
                                            apiDataStructures.map((data,index) => {
                                                index = index+1;
                                                return(
                                                    <tr className="text-center" key={data.idStructure}>
                                                        <td>{index}</td>
                                                        <td>{apiDataGoverneds.filter(datarg => datarg.idRegie == data.idRegie)[0].libelleRegie}</td>
                                                        <td>{data.nomStructure}</td>
                                                        <td>{data.localiteStructure}</td>
                                                        <td>{moment(data.dateCree).format('DD/MM/YYYY à HH:mm')}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-around">
                                                                <Link to={"/afficher-structure/"+data.idStructure} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                <Link to={"/modifier-structure/"+data.idStructure} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                {
                                                                    data.nomStructure.toLowerCase() == "arzeka" ?
                                                                    "":<a data-id={data.idStructure} type="button" className="fs-5 text-danger action_event_supprimer_structure" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        :
                                            apiDataStructures.filter(dataStr => dataStr.idRegie == methods.dataUser().idRegie).map((data,index) => {
                                                index = index+1;
                                                return(
                                                    <tr className="text-center" key={data.idStructure}>
                                                        <td>{index}</td>
                                                        <td>{apiDataGoverneds.filter(datarg => datarg.idRegie == data.idRegie)[0].libelleRegie}</td>
                                                        <td>{data.nomStructure}</td>
                                                        <td>{data.localiteStructure}</td>
                                                        <td>{moment(data.dateCree).format('DD/MM/YYYY à HH:mm')}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-around">
                                                                <Link to={"/afficher-structure/"+data.idStructure} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                <Link to={"/modifier-structure/"+data.idStructure} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                {
                                                                    data.nomStructure.toLowerCase() == "arzeka" ?
                                                                    "":<a data-id={data.idStructure} type="button" className="fs-5 text-danger action_event_supprimer_structure" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                                }
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
                            <h3 className="text-center">Aucune structure</h3>
                        )
                    }
                </div>
            </div>

            <button id="id_modal_button_delete_structure" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(structure != null) ? 'Voulez vous supprimer la structure '+structure.nomStructure:"..."}
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
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds:    state.governedReducer.governeds,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStructure: (id) => dispatch(deleteStructure(id)),
        getAllGoverneds: ()   => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Structure);
