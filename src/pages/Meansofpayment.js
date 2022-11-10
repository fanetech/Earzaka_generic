import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {DataTable} from "simple-datatables";
import { connect } from 'react-redux';
import { getAllMeansofpayments, updateMeansofpayment, deleteMeansofpayment } from '../redux/meansofpayment/meansofpaymentAction';
import $ from 'jquery';
import Swal from 'sweetalert2';



const Meansofpayment = ({ getAllMeansofpayments , apiDataMeansofpayments, apiLoadingMeansofpayments, updateMeansofpayment, deleteMeansofpayment }) => {
    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingMeansofpayments) {
            getAllMeansofpayments();
        }
    })

    const [meansofpayment, setTransactionoftype] = useState(null);

    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataMeansofpayments.filter(data => data.idMoyen == id);
            setTransactionoftype(dataUpdate[0])
            $('#id_modal_button_delete').click();
        });

        $("#datatablesSimple").on("click", ".action_event_modifier", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataMeansofpayments.filter(data => data.idMoyen == id);
            setTransactionoftype(dataUpdate[0])
            $('#id_modal_button_update').click();
        });
    });


    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setTransactionoftype({
            ...meansofpayment,
            [nam]: val
        });
    }

    const updateMeansofpaymentConfrime = () => {
        if(meansofpayment.libelleMoyen.length < 2){
            document.getElementById("errorLibelleMoyen").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (updateMeansofpayment(meansofpayment.idMoyen,meansofpayment)) {
                Swal.fire({
                    text: "Le moyen de paiement a étè modifier.",
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
    }
    
    const deleteMeansofpaymentConfrime = () => {
        if (deleteMeansofpayment(meansofpayment.idMoyen)) {
            Swal.fire({
                text: "Le moyen de paiement a étè Supprimer.",
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
            <h1 className="mt-4">Moyen de paiement</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Moyen de paiement</li>
                </ol>
                <div className="mb-4">
                    <Link data-bs-placement="top" title="Ajouter" className="fs-2" type="button" to="/ajouter-moyendepaiement"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { apiLoadingMeansofpayments && Object.keys(apiDataMeansofpayments).length > 0 ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Libelle</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataMeansofpayments.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.idMoyen}>
                                                    <td>{index}</td>
                                                    <td>{data.libelleMoyen}</td>
                                                    <td className='d-flex justify-content-around'>
                                                        <a data-id={data.idMoyen} type="button" className="fs-5 text-warning action_event_modifier" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></a>
                                                        <a data-id={data.idMoyen} type="button" className="fs-5 text-danger action_event_supprimer" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        ):
                        (
                            <h3 className="text-center">Aucun moyen de paiement</h3>
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
                            {(meansofpayment != null) ? 'Voulez vous supprimer le '+meansofpayment.libelleMoyen:"..."}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteMeansofpaymentConfrime() } className="btn text-white">Supprimer</button>
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
                                    <input type="text" className="form-control mt-2" name="libelleMoyen" value={(meansofpayment != null) ? meansofpayment.libelleMoyen:''} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errorLibelleMoyen" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" style={{ background: "#033d7c" }} onClick={() => updateMeansofpaymentConfrime() } className="btn text-white">Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        apiLoadingMeansofpayments: state.meansofpaymentReducer.loadingMeansofpayment,
        apiDataMeansofpayments: state.meansofpaymentReducer.meansofpayments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMeansofpayments: ()         => dispatch(getAllMeansofpayments()),
        updateMeansofpayment: (id,meansofpayment)  => dispatch(updateMeansofpayment(id,meansofpayment)),
        deleteMeansofpayment: (id)        => dispatch(deleteMeansofpayment(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meansofpayment);
