import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import methods from '../../constant';
import { createEvaluation } from '../../redux/evaluation/evaluationAction';
import { getAllServices } from '../../redux/service/serviceAction';
import { getAllDemandedemandeevaluations } from '../../redux/demandeevaluation/demandeevaluationAction';
import Swal from 'sweetalert2';
import moment from "moment";

const CreateEvaluation = ({ apiLoadingDemandeevaluation, apiDataDemandeevaluation, apiLoadingServices, apiDataServices, getAllDemandedemandeevaluations, getAllServices, createEvaluation}) => {

    let { id } = useParams();

    console.log(id);

    const [evaluation, setEvaluation] = useState({ 'idRegie': '5', 'idAgent': '81', 'idStructure': '6', 'idDmd': '101', 'amount':'', 'etatEval': '' });
    const [demande, setDemande] = useState({ 'id':'', 'idRegie':'', 'serviceId':'', 'userPhoneNumber':'', 'date':'', 'data':'' });


    useEffect(() => {
        if (!apiLoadingDemandeevaluation) {
            getAllDemandedemandeevaluations();
        }

        if (!apiLoadingServices) {
            getAllServices();
        }

        if (apiLoadingDemandeevaluation) {
            let dataUpdate = apiDataDemandeevaluation.filter(data => data.id == id);
            if(dataUpdate.length == 1){
                setDemande(dataUpdate[0])
            }
        }
    },[])

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setEvaluation({
            ...evaluation,
            [nam]: val
        });
    }

    const createGovernedConfrime = async () => {

        if (!methods.isNumeric(evaluation.amount)) {
            document.getElementById("errorMontant").innerText = "Veuillez saisir uniquement des chiffres.";
        }else{
            document.getElementById("errorMontant").innerText = "";
            if(evaluation.amount.length < 2){
                document.getElementById("errorMontant").innerText = "Le nombre de caractère minimum est 2."
            }else{
                document.getElementById("errorMontant").innerText = "";
                setEvaluation({...evaluation, 'idRegie': methods.dataUser().idRegie, 'idAgent': methods.dataUser().idAgent, 'idStructure': methods.dataUser().idStructure, 'idDmd': demande.id, 'etatEval': 'traiter' })
                console.log(evaluation);
                if (await createEvaluation(evaluation) == true) {
                    Swal.fire({
                        text: "La demande a été traitée.",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton: "btn btn-success"
                        }
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            window.location.pathname = "/demandeevaluation";
                        }
                    });
                }else{
                    Swal.fire({
                        text: "Veuillez vérifier les informations saisies.",
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
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Evaluation</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Traitement de la demande</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                    { (apiLoadingDemandeevaluation && Object.keys(apiDataDemandeevaluation).length > 0 && apiLoadingServices && Object.keys(apiDataServices).length > 0 ) ?
                        (
                            <>
                                <div className="row text-center">
                                    <div className="col-sm-12 col-md-6 mb-2">
                                        <h6 className="fw-bold">N° Demande : {demande.id}</h6>
                                    </div>
                                    <div className="col-sm-12 col-md-6 mb-2">
                                        <h6 className="fw-bold">Date : {moment(demande.date).format('DD/MM/YYYY à HH:mm')}</h6>
                                    </div>
                                </div>
                                {
                                    console.log('apiDataServices.filter(datarg => datarg.id == demande.serviceId)[0]',demande)
                                    // console.log('apiDataServices.filter(datarg => datarg.id == demande.serviceId)[0]', apiDataServices.filter(datarg => datarg.id == demande.serviceId))
                                }
                                <h4 className="fw-bold text-center">Service : {apiDataServices.filter(datarg => datarg.id == demande.serviceId)[0].labels[0]}</h4>
                                <hr className="my-3"/>
                                <div className="row mb-2 overflow-auto h-25-icone py-2">
                                    {
                                        apiDataServices.filter(datarg => datarg.id == demande.serviceId)[0].fields != null ?
                                        <>
                                            <h3 className="text-center my-2">Données</h3>
                                            {
                                                apiDataServices.filter(datarg => datarg.id == demande.serviceId)[0].fields.map((data,index) => (
                                                    <div className="col-md-4" key={index}>
                                                        <h6>{data.labels[0]} : </h6>{demande.data[data.key]}
                                                    </div>
                                                ))
                                            }
                                        </>
                                        :""
                                    }
                                </div>
                                <hr className="my-3"/>
                                <div className="d-flex row justify-content-center">
                                    <div className="col-sm-12 col-md-6 mb-2">
                                        <div className="form-group">
                                            <label className="fw-bold">Montant(F CFA) <span className="text-danger">*</span> :</label>
                                            <input type="text" className="form-control mt-2" name="amount" value={evaluation.amount} required onChange={(event) => myChangeHandler(event)} />
                                            <small id="errorMontant" className="text-danger"></small>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ):<p></p>
                    }
                        
                        <div className="row">
                            <div className="col-sm-12 col-md-12 mb-2">
                                <div className="d-flex justify-content-center mt-2 p-2">
                                    <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/demandeevaluation">Annuler</Link>
                                    <button type="button" className="btn btn-primary" onClick={() => createGovernedConfrime()} data-toggle="button">Confirmer</button>
                                </div>
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
        apiLoadingServices: state.serviceReducer.loadingService,
        apiDataServices: state.serviceReducer.services,
        apiLoadingDemandeevaluation: state.demandeevaluationReducer.loadingDemandeevaluation,
        apiDataDemandeevaluation: state.demandeevaluationReducer.demandeevaluations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createEvaluation: (evaluationofresquest) => dispatch(createEvaluation(evaluationofresquest)),
        getAllDemandedemandeevaluations: ()         => dispatch(getAllDemandedemandeevaluations()),
        getAllServices: () => dispatch(getAllServices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvaluation);