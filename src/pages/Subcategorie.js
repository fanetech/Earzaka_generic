import React, { useEffect, useState } from 'react';
import {DataTable} from "simple-datatables";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCategorys} from '../redux/category/categoryAction';
import { deleteSubcategory, getAllSubcategorys } from '../redux/subcategory/subcategoryAction';
import $ from 'jquery';
import Swal from 'sweetalert2';


const Subcategorie = ({getAllCategorys, deleteSubcategory, getAllSubcategorys, apiLoadingCategories, apiDataCategories, apiLoadingSubcategories, apiDataSubcategories}) => {

    const [subcategory, setSubcategory] = useState(null);

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        if (myTable) {
            new DataTable(myTable);
        }

        if (!apiLoadingCategories) {
            getAllCategorys();
        }

        if (!apiLoadingSubcategories) {
            getAllSubcategorys();
        }
    })

    $(document).ready(function() {

        $("#datatablesSimple").on("click", ".action_event_supprimer_subcategorie", function () {
            let id = $(this).data("id");
            let dataUpdate = apiDataSubcategories.filter(data => data.id == id);
            setSubcategory(dataUpdate[0]);
            $('#id_modal_button_delete_subcategorie').click();
        });
    })

    const deleteSubCategorieConfrime = () => {
        if (deleteSubcategory(subcategory.id)) {
            Swal.fire({
                text: "La sous catégorie a étè Supprimer.",
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
            <h1 className="mt-4">Sous Catégorie</h1>
            <div className="d-flex align-items-center justify-content-between">
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Sous Catégorie</li>
                </ol>
                <div className="mb-4">
                    <Link to={"/ajouter-souscategorie"} data-bs-placement="top" title="Ajouter" className="fs-2" type="button"><i className="fas fa-plus"></i></Link>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    { (apiLoadingCategories && Object.keys(apiDataCategories).length > 0 && apiLoadingSubcategories && Object.keys(apiDataSubcategories).length > 0 ) ?
                        (
                            <table id="datatablesSimple" className="table-striped">
                                <thead className="text-white" style={{ background: "#033d7c" }}>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Catégorie</th>
                                        <th>Libelle Français</th>
                                        <th>Libelle Anglais</th>
                                        <th>Icône</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th className="width-table">Numéro</th>
                                        <th>Catégorie</th>
                                        <th>Libelle Français</th>
                                        <th>Libelle Anglais</th>
                                        <th>Icône</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        apiDataSubcategories.map((data,index) => {
                                            index = index+1;
                                            return(
                                                <tr className="text-center" key={data.id}>
                                                    <td>{index}</td>
                                                    <td>{apiDataCategories.filter(datarg => datarg.id == data.categoryId)[0].labels[0]}</td>
                                                    <td>{data.labels[0]}</td>
                                                    <td>{data.labels[1]}</td>
                                                    <td><span className="material-icons">{data.iconName}</span></td>
                                                    <td>
                                                        <div className="d-flex justify-content-around">
                                                            <Link to={"/modifier-souscategorie/"+data.id} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                            <a data-id={data.id} type="button" className="fs-5 text-danger action_event_supprimer_subcategorie" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
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
                            <h3 className="text-center">Aucune sous catégorie</h3>
                        )
                    }
                </div>

                <button id="id_modal_button_delete_subcategorie" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {(subcategory != null) ? 'Voulez vous supprimer la sous catégorie '+subcategory.labels[0]+' ou '+subcategory.labels[1]:"..."}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteSubCategorieConfrime() } className="btn text-white">Supprimer</button>
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
        apiLoadingCategories: state.categoryReducer.loadingCategory,
        apiDataCategories: state.categoryReducer.categories,
        apiLoadingSubcategories: state.subcategoryReducer.loadingSubcategory,
        apiDataSubcategories: state.subcategoryReducer.subcategories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSubcategory: (id) => dispatch(deleteSubcategory(id)),
        getAllCategorys: ()   => dispatch(getAllCategorys()),
        getAllSubcategorys: ()   => dispatch(getAllSubcategorys()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subcategorie);
