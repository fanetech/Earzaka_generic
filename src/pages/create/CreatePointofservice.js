import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPointofservice } from '../../redux/pointofservice/pointofserviceAction';
import methods from '../../constant';
import Swal from 'sweetalert2';

const CreatePointofservice = ({ createPointofservice }) => {

    const [pointofservice, setPointofservice] = useState({ 'libellePS':'', 'telPS':'', 'emailPS':'', 'adrPS':'', 'respPS':'', 'telRespPS':'', 'emailRespPS':'', 'numRC':'', 'numIFU':'', 'numCptePS':'', 'typePS':'Privé'});

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setPointofservice({
            ...pointofservice,
            [nam]: val
        });
    }

    const CreatePointofserviceConfrime = () => {
        if(pointofservice.libellePS.length < 2){
            document.getElementById("errorlibellePS").innerText = "Le nombre de caractère minimum est 2."
        }else{
            document.getElementById("errorlibellePS").innerText = "";
            if(pointofservice.telPS.length < 2){
                document.getElementById("errortelPS").innerText = "Le nombre de caractère minimum est 2.";
            }else {
                document.getElementById("errortelPS").innerText = "";
                if(!methods.validateEmail(pointofservice.emailPS)){
                    document.getElementById("erroremailPS").innerText = "Cet email n'est pas valide.";
                }else {
                    document.getElementById("erroremailPS").innerText = "";
                    if(pointofservice.adrPS.length < 2){
                        document.getElementById("erroradrPS").innerText = "Le nombre de caractère minimum est 2.";
                    }else {
                        document.getElementById("erroradrPS").innerText = "";
                        if (pointofservice.respPS.length < 2 ) {
                            document.getElementById("errorrespPS").innerText = "Le nombre de caractère minimum est 2.";
                        } else {
                            document.getElementById("errorrespPS").innerText = "";
                            if (pointofservice.telRespPS.length < 2 ) {
                                document.getElementById("errortelRespPS").innerText = "Le nombre de caractère minimum est 2.";
                            } else {
                                document.getElementById("errortelRespPS").innerText = "";
                                if (!methods.validateEmail(pointofservice.emailRespPS)) {
                                    document.getElementById("erroremailRespPS").innerText = "Cet email n'est pas valide.";
                                } else {
                                    document.getElementById("erroremailRespPS").innerText = "";
                                    if (pointofservice.numRC.length < 2 ) {
                                        document.getElementById("errornumRC").innerText = "Le nombre de caractère minimum est 2.";
                                    } else {
                                        document.getElementById("errornumRC").innerText = "";
                                        if (pointofservice.numIFU.length < 2 ) {
                                            document.getElementById("errornumIFU").innerText = "Le nombre de caractère minimum est 2.";
                                        } else {
                                            document.getElementById("errornumIFU").innerText = "";
                                            if (pointofservice.numCptePS.length < 2 ) {
                                                document.getElementById("errornumCptePS").innerText = "Le nombre de caractère minimum est 2.";
                                            } else {
                                                document.getElementById("errornumCptePS").innerText = "";
                                                if (pointofservice.typePS.length < 2 ) {
                                                    document.getElementById("errortypePS").innerText = "Le nombre de caractère minimum est 2.";
                                                } else {
                                                    document.getElementById("errortypePS").innerText = "";
                                                    if (createPointofservice(pointofservice)) {
                                                        Swal.fire({
                                                            text: "Un nouveau point de service a étè ajouter.",
                                                            icon: "success",
                                                            buttonsStyling: false,
                                                            confirmButtonText: "OK",
                                                            customClass: {
                                                                confirmButton: "btn btn-success"
                                                            }
                                                        }).then(function (result) {
                                                            if (result.isConfirmed) {
                                                                window.location.pathname = "/pointdeservice";
                                                            }
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Point de Services</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau point de service</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Libelle <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="libellePS" value={pointofservice.libellePS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errorlibellePS" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Téléphone <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="telPS" value={pointofservice.telPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errortelPS" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Email <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="emailPS" value={pointofservice.emailPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="erroremailPS" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Adresse <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="adrPS" value={pointofservice.adrPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="erroradrPS" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6 col-md-4 mb-2">
                                <div className="form-group">
                                    <label>Responsable <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="respPS" value={pointofservice.respPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errorrespPS" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 mb-2">
                                <div className="form-group">
                                    <label>Téléphone <span className="text-danger">(Responsable) *</span> :</label>
                                    <input type="text" className="form-control mt-2" name="telRespPS" value={pointofservice.telRespPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errortelRespPS" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-4 mb-2">
                                <div className="form-group">
                                    <label>Email <span className="text-danger">(Responsable) *</span> :</label>
                                    <input type="text" className="form-control mt-2" name="emailRespPS" value={pointofservice.emailRespPS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="erroremailRespPS" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Numéro RC <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="numRC" value={pointofservice.numRC} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errornumRC" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Numéro IFU <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="numIFU" value={pointofservice.numIFU} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errornumIFU" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-sm-6 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Numéro du compte <span className="text-danger">*</span> :</label>
                                    <input type="text" className="form-control mt-2" name="numCptePS" value={pointofservice.numCptePS} required onChange={(event) => myChangeHandler(event)} />
                                    <small id="errornumCptePS" className="text-danger"></small>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-6 mb-2">
                                <div className="form-group">
                                    <label>Type <span className="text-danger">*</span> :</label>
                                    <select className="form-control mt-2" name="typePS" onChange={(event) => myChangeHandler(event)}>
                                        <option selected value='Privé'>Privé</option>
                                        <option value='Public '>Public</option>
                                    </select>
                                    <small id="errortypePS" className="text-danger"></small>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-center mt-2 p-2">
                                <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/pointdeservice">Annuler</Link>
                                <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => CreatePointofserviceConfrime()} data-toggle="button">Confirmer</button>
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPointofservice: (pointofservice) => dispatch(createPointofservice(pointofservice))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePointofservice);