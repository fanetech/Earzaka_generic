import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllSubcategorys } from '../../redux/subcategory/subcategoryAction';
import { getAllServices } from '../../redux/service/serviceAction';


const ShowService = ({getAllServices, getAllSubcategorys, apiLoadingServices, apiDataServices, apiLoadingSubcategories, apiDataSubcategories}) => {

    let { id } = useParams();

    const [service, setService] = useState({ 'subCategoryId': '', 'labels': ['',''], 'amount': '', 'calculationMethod': '', 'iconName': '' });

    useEffect(() => {
        if (!apiLoadingSubcategories) {
            getAllSubcategorys();
        }
        if (!apiLoadingServices) {
            getAllServices();
        }

        if (apiLoadingServices) {
            let dataUpdate = apiDataServices.filter(data => data.id == id);
            if(dataUpdate.length == 1){
                setService(dataUpdate[0])
            }
        }

    },[])


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Service</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Afficher le service</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { (apiLoadingServices && Object.keys(apiDataSubcategories).length > 0 && apiLoadingServices && Object.keys(apiDataServices).length > 0 ) ?
                            (
                                <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Sous Catégorie : </h6>{apiDataSubcategories.filter(data => data.id == service.subCategoryId)[0].labels[0]}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Libelle Français : </h6>{service.labels[0]}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Libelle Anglais : </h6>{service.labels[1]}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Icône : </h6><span className="material-icons">{service.iconName}</span>
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Montant : </h6>{service.amount+' F CFA'}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Méthode de calcul : </h6>{service.calculationMethod}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/service">Retour</Link>
                                    </div>
                                </div>
                            ):(<p></p>)
                        }
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
        getAllSubcategorys: ()   => dispatch(getAllSubcategorys()),
        getAllServices: ()   => dispatch(getAllServices())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowService);