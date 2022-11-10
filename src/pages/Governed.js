import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import { connect } from 'react-redux';
import { getAllGoverneds, updateGoverned, deleteGoverned } from '../redux/governed/governedAction';
import $ from 'jquery';
import Swal from 'sweetalert2';



const Governed = ({ getAllGoverneds , apiDataGoverneds, apiLoadingGoverneds, updateGoverned, deleteGoverned }) => {
    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }
    })

    const [regie, setRegie] = useState(null);


    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataGoverneds.filter(data => data.idRegie == id);
            setRegie(dataUpdate[0])
            $('#id_modal_button_delete').click();
        });

        $("#datatablesSimple").on("click", ".action_event_modifier", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataGoverneds.filter(data => data.idRegie == id);
            setRegie(dataUpdate[0])
            $('#id_modal_button_update').click();
        });

        $("#datatablesSimple").on("click", ".action_event_statut", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataGoverneds.filter(data => data.idRegie == id);
            setRegie({
                "idRegie": dataUpdate[0].idRegie,
                "libelleRegie": dataUpdate[0].libelleRegie,
                "statut": (dataUpdate[0].statut) ? false:true,
                "dateCree": dataUpdate[0].dateCree
            });
            $('#id_modal_button_update_statut').click();
        });
    });


    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setRegie({
            ...regie,
            [nam]: val
        });
    }

    const updateGovernedConfrime = async () => {
        if(regie.libelleRegie.length < 2){
            document.getElementById("errorLibelleRegie").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (await updateGoverned(regie.idRegie,regie) == true) {
                Swal.fire({
                    text: "La régie a étè modifier.",
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
            }else{
                Swal.fire({
                    text: "Le libelle est déja utilisé. Veuillez vérifier les informations saisies.",
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-danger"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        
                    }
                });
            }
        }
    }
    
    const deleteGovernedConfrime = async () => {
        if (await deleteGoverned(regie.idRegie) == true) {
            Swal.fire({
                text: "La régie a étè Supprimer.",
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
        }else{
            Swal.fire({
                text: "La régie est associé à une structure.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-danger"
                }
            }).then(function (result) {
                if (result.isConfirmed) {
                }
            });
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Régie</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Régie</li>
                </ol>
                {/* <div className="mb-4">
                    <Link data-bs-placement="top" title="Ajouter" className="fs-2" type="button" to="/ajouter-regie"><i className="fas fa-plus"></i></Link>
                </div> */}
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        {/* <th>Statut</th>
                                        <th></th> */}
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        {/* <th>Statut</th>
                                        <th></th> */}
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataGoverneds.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idRegie}>
                                                    <td>{index}</td>
                                                    <td>{data.libelleRegie}</td>
                                                    {/* <td><a data-id={data.idRegie} type="button" className="fs-5 text-primary action_event_statut" style={{ color: 'inherit', textDecoration: 'none' }}><span className={data.statut ? "badge bg-success" : "badge bg-danger"}>{data.statut ? "Active" : "Désactive"}</span></a></td>
                                                    <td className='d-flex justify-content-around'>
                                                        <a data-id={data.idRegie} type="button" className="fs-5 text-warning action_event_modifier" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></a>
                                                        <a data-id={data.idRegie} type="button" className="fs-5 text-danger action_event_supprimer" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                    </td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucune régie</h3>
                        )
                    }
                </div>
            </div>

            <button id="id_modal_button_delete" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(regie != null) ? 'Voulez vous supprimer le '+regie.libelleRegie:"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteGovernedConfrime() } className="btn text-white">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="id_modal_button_update" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1"></button>
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Modification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="col-sm-12 col-md-12 mb-2">
                                <div className="form-group">
                                    <label>Libelle</label>
                                    <input type="text" className="form-control mt-2" name="libelleRegie" value={(regie != null) ? regie.libelleRegie:''} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errorLibelleRegie" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateGovernedConfrime() } className="btn text-white">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>

            <button id="id_modal_button_update_statut" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"></button>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel">Statut</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {(regie != null) ? 'Voulez vous '+(regie.statut ? "Active "+regie.libelleRegie : "Désactive "+regie.libelleRegie):"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateGovernedConfrime() } className="btn text-white">{ regie ? (regie.statut ? "Active" : "Désactive"):'...'}</button>
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
        apiDataGoverneds: state.governedReducer.governeds
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGoverneds: ()         => dispatch(getAllGoverneds()),
        updateGoverned: (id,regie)  => dispatch(updateGoverned(id,regie)),
        deleteGoverned: (id)        => dispatch(deleteGoverned(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Governed);
