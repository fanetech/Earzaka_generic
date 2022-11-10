import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructure } from '../../redux/structure/structureAction';
import { getAllGoverneds } from '../../redux/governed/governedAction';
import Swal from 'sweetalert2';
import methods from '../../constant';

const INPUT_TIMEOUT = 250;

const CreateStructure = ({ createStructure, apiLoadingGoverneds, getAllGoverneds, apiDataGoverneds }) => {

    useEffect(() => {
        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }
    })

    const [structure, setStructure] = useState({ 'idRegie': '', 'nomStructure': '', 'localiteStructure': '', 'telStructure': '', 'emailStructure': '', 'adrStructure': '' });

    const [predictions, setPredictions] = useState([])

    const getPredictions = (value) => {
        return methods.communes.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setStructure({
            ...structure,
            [nam]: val
        });

        if (nam == "localiteStructure" && val.length > 0) {
            setTimeout(() => {
                setPredictions(getPredictions(val));
            }, INPUT_TIMEOUT);
        } else {
            setPredictions([]);
        }
    }

    const createStructureConfrime = () => {
        if (structure.idRegie.length < 1) {
            document.getElementById("erroridRegie").innerText = "Veuillez choisir une régie."
        } else {
            document.getElementById("erroridRegie").innerText = "";
            if (structure.nomStructure.length < 2) {
                document.getElementById("errornomStructure").innerText = "Le nombre de caractère minimum est 2.";
            } else {
                document.getElementById("errornomStructure").innerText = "";
                if (structure.localiteStructure.length < 2) {
                    document.getElementById("errorlocaliteStructure").innerText = "Le nombre de caractère minimum est 2.";
                } else {
                    document.getElementById("errorlocaliteStructure").innerText = "";
                    if (structure.telStructure.length < 8) {
                        document.getElementById("errortelStructure").innerText = "Le nombre de caractère minimum est 8.";
                    } else {
                        document.getElementById("errortelStructure").innerText = "";
                        if (!methods.validateEmail(structure.emailStructure)) {
                            document.getElementById("erroremailStructure").innerText = "Cet email n'est pas valide.";
                        } else {
                            document.getElementById("erroremailStructure").innerText = "";
                            if (structure.adrStructure.length < 4) {
                                document.getElementById("erroradrStructure").innerText = "Le nombre de caractère minimum est 4.";
                            } else {
                                document.getElementById("erroradrStructure").innerText = "";
                                if (createStructure(structure)) {
                                    Swal.fire({
                                        text: "Une nouvelle structure a étè ajouter.",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "OK",
                                        customClass: {
                                            confirmButton: "btn btn-success"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            window.location.pathname = "/structure";
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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Structure</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter une nouvelle structure</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        {apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 ?
                            (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Régie <span className="text-danger">*</span> :</label>
                                                <select className="form-control mt-2" name="idRegie" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir une régie...</option>
                                                    {
                                                        apiDataGoverneds.filter(data => data.statut == true).map((data) => {
                                                            return (<option value={data.idRegie} key={data.idRegie}>{data.libelleRegie}</option>)
                                                        })
                                                    }
                                                </select>
                                                <small id="erroridRegie" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Nom de la structure <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="nomStructure" value={structure.nomStructure} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="errornomStructure" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Localité <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="localiteStructure" value={structure.localiteStructure} required onChange={(event) => myChangeHandler(event)} />
                                                {
                                                    predictions.length > 0 ?
                                                    (
                                                        <div className="card position-absolute">
                                                            <div className="card-body overflow-auto h-25-localite">
                                                                {
                                                                    predictions.map((item, index) => (
                                                                        <p key={index + item} style={{cursor: "pointer"}} onClick={()=>(setStructure({...structure,'localiteStructure': item}),setPredictions([]))}>{item}</p>
                                                                    ))
                                                                } 
                                                            </div>
                                                        </div>
                                                    ):
                                                    ""
                                                }
                                                <small id="errorlocaliteStructure" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Téléphone <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="telStructure" value={structure.telStructure} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="errortelStructure" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Email <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="emailStructure" value={structure.emailStructure} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="erroremailStructure" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Adresse <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="adrStructure" value={structure.adrStructure} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="erroradrStructure" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="d-flex justify-content-center mt-2 p-2">
                                            <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/structure">Annuler</Link>
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => createStructureConfrime()} data-toggle="button">Confirmer</button>
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
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds: state.governedReducer.governeds
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createStructure: (structure) => dispatch(createStructure(structure)),
        getAllGoverneds: () => dispatch(getAllGoverneds()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStructure);