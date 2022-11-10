import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTicket } from '../../redux/ticket/ticketAction';
import { getAllPointofservices } from '../../redux/pointofservice/pointofserviceAction';
import Swal from 'sweetalert2';
import methods from '../../constant';

const CreateTicket = ({ createTicket, apiLoadingPointofservices, getAllPointofservices, apiDataPointofservices }) => {

    useEffect(() => {
        if (!apiLoadingPointofservices) {
            getAllPointofservices();
        }
    })

    const [guichet, setGuichet] = useState({ 'idPS': '', 'libelleGuichet': '', 'telGuichet': '', 'emailGuichet': '', 'adrGuichet': ''});

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setGuichet({
            ...guichet,
            [nam]: val
        });
    }

    const createTicketConfrime = () => {
        if (guichet.idPS.length < 1) {
            document.getElementById("erroridPS").innerText = "Veuillez choisir un point de service."
        } else {
            document.getElementById("erroridPS").innerText = "";
            if (guichet.libelleGuichet.length < 2) {
                document.getElementById("errorlibelleGuichet").innerText = "Le nombre de caractère minimum est 2.";
            } else {
                document.getElementById("errorlibelleGuichet").innerText = "";
                if (guichet.telGuichet.length < 8) {
                    document.getElementById("errortelGuichet").innerText = "Le nombre de caractère minimum est 8.";
                } else {
                    document.getElementById("errortelGuichet").innerText = "";
                    if (!methods.validateEmail(guichet.emailGuichet)) {
                        document.getElementById("erroremailGuichet").innerText = "Cet email n'est pas valide.";
                    } else {
                        document.getElementById("erroremailGuichet").innerText = "";
                        if (guichet.adrGuichet.length < 4) {
                            document.getElementById("erroradrGuichet").innerText = "Le nombre de caractère minimum est 4.";
                        } else {
                            document.getElementById("erroradrGuichet").innerText = "";
                            if (createTicket(guichet)) {
                                Swal.fire({
                                    text: "Un nouveau  guichet a étè ajouter.",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "OK",
                                    customClass: {
                                        confirmButton: "btn btn-success"
                                    }
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        window.location.pathname = "/guichet";
                                    }
                                });
                            }
                        }

                    }
                }
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Guichet</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau guichet</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        {apiLoadingPointofservices && Object.keys(apiDataPointofservices).length > 0 ?
                            (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-6 mb-2">
                                            <div className="form-group">
                                                <label>Point de service <span className="text-danger">*</span> :</label>
                                                <select className="form-control mt-2" name="idPS" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir un point de service...</option>
                                                    {
                                                        apiDataPointofservices.map((data) => {
                                                            return (<option value={data.idPS} key={data.idPS}>{data.libellePS}</option>)
                                                        })
                                                    }
                                                </select>
                                                <small id="erroridPS" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 mb-2">
                                            <div className="form-group">
                                                <label>Libelle<span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="libelleGuichet" value={guichet.libelleGuichet} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="errorlibelleGuichet" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Téléphone <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="telGuichet" value={guichet.telGuichet} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="errortelGuichet" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Email <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="emailGuichet" value={guichet.emailGuichet} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="erroremailGuichet" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Adresse <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="adrGuichet" value={guichet.adrGuichet} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="erroradrGuichet" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-center mt-2 p-2">
                                            <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/guichet">Annuler</Link>
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => createTicketConfrime()} data-toggle="button">Confirmer</button>
                                        </div>
                                    </div>
                                </>
                            ) : (<p></p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingPointofservices: state.pointofserviceReducer.loadingPointofservice,
        apiDataPointofservices: state.pointofserviceReducer.pointofservices
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTicket: (guichet) => dispatch(createTicket(guichet)),
        getAllPointofservices: () => dispatch(getAllPointofservices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);