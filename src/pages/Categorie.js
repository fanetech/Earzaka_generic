import React, { useEffect, useState } from 'react';
import {DataTable} from "simple-datatables";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCategory, getAllCategorys} from '../redux/category/categoryAction';
import { getAllGoverneds } from '../redux/governed/governedAction';
import $ from 'jquery';
import Swal from 'sweetalert2';

const Categorie = ({ deleteCategory, getAllCategorys, apiLoadingCategories, apiDataCategories, apiLoadingGoverneds, apiDataGoverneds, getAllGoverneds }) => {

    const [category, setCategory] = useState(null);

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }

        if (!apiLoadingCategories) {
            getAllCategorys();
        }
    })

    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer_categorie", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataCategories.filter(data => data.id == id);
            setCategory(dataUpdate[0]);
            $('#id_modal_button_delete_categorie').click();
        });
    })

    const deleteCategorieConfrime = () => {
        if (deleteCategory(category.id)) {
            Swal.fire({
                text: "La catégorie a étè Supprimer.",
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
            <h1 className="mt-4">Catégorie</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Catégorie</li>
                </ol>
                <div className="mb-4">
                    <Link to={"/ajouter-categorie"} data-bs-placement="top" title="Ajouter" className="fs-2" type="button"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { (apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingCategories && Object.keys(apiDataCategories).length > 0 ) ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Régie</th>
                                        <th>Libelle Français</th>
                                        <th>Libelle Anglais</th>
                                        <th>Icône</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Régie</th>
                                        <th>Libelle Français</th>
                                        <th>Libelle Anglais</th>
                                        <th>Icône</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataCategories.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.id}>
                                                    <td>{index}</td>
                                                    <td>{apiDataGoverneds.filter(datarg => datarg.idRegie == data.regieId)[0].libelleRegie}</td>
                                                    <td>{data.labels[0]}</td>
                                                    <td>{data.labels[1]}</td>
                                                    <td><span className="material-icons">{data.iconName}</span></td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link to={"/modifier-categorie/"+data.id} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                            <a data-id={data.id} type="button" className="fs-5 text-danger action_event_supprimer_categorie" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
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
                            <h3 className="text-center">Aucune catégorie</h3>
                        )
                    }
                </div>

                <button id="id_modal_button_delete_categorie" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {(category != null) ? 'Voulez vous supprimer la catégorie '+category.labels[0]+' ou '+category.labels[1]:"..."}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteCategorieConfrime() } className="btn text-white">Supprimer</button>
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
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds:    state.governedReducer.governeds,
        apiLoadingCategories: state.categoryReducer.loadingCategory,
        apiDataCategories: state.categoryReducer.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCategory: (id) => dispatch(deleteCategory(id)),
        getAllGoverneds: ()   => dispatch(getAllGoverneds()),
        getAllCategorys: ()   => dispatch(getAllCategorys()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorie);
