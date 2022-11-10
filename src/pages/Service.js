    import React, { useEffect, useState } from 'react';
    import {DataTable} from "simple-datatables";
    import { Link } from 'react-router-dom';
    import { connect } from 'react-redux';
    import { getAllSubcategorys } from '../redux/subcategory/subcategoryAction';
    import { getAllServices, deleteService } from '../redux/service/serviceAction';
    import $ from 'jquery';
    import Swal from 'sweetalert2';
    
    
    const Service = ({getAllServices, deleteService, getAllSubcategorys, apiLoadingServices, apiDataServices, apiLoadingSubcategories, apiDataSubcategories}) => {
    
        const [service, setService] = useState(null);
    
        useEffect(() => {
            const myTable = document.querySelector("#datatablesSimple");
            if (myTable) {
                new DataTable(myTable);
            }
    
            if (!apiLoadingSubcategories) {
                getAllSubcategorys();
            }
            if (!apiLoadingServices) {
                getAllServices();
            }
        })
    
        $(document).ready(function() {
    
            $("#datatablesSimple").on("click", ".action_event_supprimer_service", function () {
                let id = $(this).data("id");
                let dataUpdate = apiDataServices.filter(data => data.id == id);
                setService(dataUpdate[0]);
                $('#id_modal_button_delete_service').click();
            });
        })
    
        const deleteServiceConfrime = () => {
            if (deleteService(service.id)) {
                Swal.fire({
                    text: "Le service a étè Supprimer.",
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
                <h1 className="mt-4">Service</h1>
                <div className="d-flex align-items-center justify-content-between">
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Service</li>
                    </ol>
                    <div className="mb-4">
                        <Link to={"/ajouter-service"} data-bs-placement="top" title="Ajouter" className="fs-2" type="button"><i className="fas fa-plus"></i></Link>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        { (apiLoadingServices && Object.keys(apiDataSubcategories).length > 0 && apiLoadingServices && Object.keys(apiDataServices).length > 0 ) ?
                            (
                                <table id="datatablesSimple" className="table-striped">
                                    <thead className="text-white" style={{ background: "#033d7c" }}>
                                        <tr>
                                            <th className="width-table">Numéro</th>
                                            <th>Sous Catégorie</th>
                                            <th>Libelle Français</th>
                                            <th>Libelle Anglais</th>
                                            <th>Montant</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th className="width-table">Numéro</th>
                                            <th>Sous Catégorie</th>
                                            <th>Libelle Français</th>
                                            <th>Libelle Anglais</th>
                                            <th>Montant</th>
                                            <th></th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {
                                            apiDataServices.map((data,index) => {
                                                index = index+1;
                                                return(
                                                    <tr className="text-center" key={data.id}>
                                                        <td>{index}</td>
                                                        <td>{apiDataSubcategories.filter(datarg => datarg.id == data.subCategoryId)[0].labels[0]}</td>
                                                        <td>{data.labels[0]}</td>
                                                        <td>{data.labels[1]}</td>
                                                        <td>{data.amount+' F CFA'}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-around">
                                                                <Link to={"/afficher-service/"+data.id} type="button" className="fs-5 text-primary" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-eye"></i></Link>
                                                                <Link to={"/modifier-service/"+data.id} type="button" className="fs-5 text-warning" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                                <a data-id={data.id} type="button" className="fs-5 text-danger action_event_supprimer_service" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fa-solid fa-trash-can"></i></a>
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
                                <h3 className="text-center">Aucun service</h3>
                            )
                        }
                    </div>
    
                    <button id="id_modal_button_delete_service" type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-center" id="exampleModalLabel">Suppression</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {(service != null) ? 'Voulez vous supprimer le service '+service.labels[0]+' ou '+service.labels[1]:"..."}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                    <button type="button" style={{ background: "#033d7c" }} onClick={() => deleteServiceConfrime() } className="btn text-white">Supprimer</button>
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
            apiLoadingSubcategories: state.subcategoryReducer.loadingSubcategory,
            apiDataSubcategories: state.subcategoryReducer.subcategories,
            apiLoadingServices: state.serviceReducer.loadingService,
            apiDataServices: state.serviceReducer.services
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            deleteService: (id)   => dispatch(deleteService(id)),
            getAllSubcategorys: ()   => dispatch(getAllSubcategorys()),
            getAllServices: ()   => dispatch(getAllServices()),
        }
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Service);
    