import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateStructure, getAllStructures } from '../../redux/structure/structureAction';
import { getAllGoverneds } from '../../redux/governed/governedAction';
import Swal from 'sweetalert2';
import methods from '../../constant';


const EditStructure = ({ updateStructure, apiLoadingGoverneds, getAllGoverneds, apiDataGoverneds, apiLoadingStructures, apiDataStructures, getAllStructures }) => {

    let { id } = useParams();

    const [structure, setStructure] = useState({ 'idRegie': '', 'nomStructure': '', 'localiteStructure': '', 'telStructure': '', 'emailStructure': '', 'adrStructure': '' });

    useEffect(() => {
        if (!apiLoadingStructures) {
            getAllStructures();
        }
        
        if (!apiLoadingGoverneds) {
            getAllGoverneds();
        }

        if (apiLoadingStructures) {
            let dataUpdate = apiDataStructures.filter(data => data.idStructure == id);
            if(dataUpdate.length == 1){
                setStructure(dataUpdate[0])
            }
        }

    },[])

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setStructure({
            ...structure,
            [nam]: val
        });
    }

    const updateStructureConfrime = () => {
        if(structure.idRegie.length < 1){
            document.getElementById("erroridRegie").innerText = "Veuillez choisir une régie."
        }else{
            document.getElementById("erroridRegie").innerText = "";
            if(structure.nomStructure.length < 2){
                document.getElementById("errornomStructure").innerText = "Le nombre de caractère minimum est 2.";
            }else {
                document.getElementById("errornomStructure").innerText = "";
                if(structure.localiteStructure.length < 2){
                    document.getElementById("errorlocaliteStructure").innerText = "Le nombre de caractère minimum est 2.";
                }else {
                    document.getElementById("errorlocaliteStructure").innerText = "";
                    if(structure.telStructure.length < 8){
                        document.getElementById("errortelStructure").innerText = "Le nombre de caractère minimum est 8.";
                    }else {
                        document.getElementById("errortelStructure").innerText = "";
                        if(!methods.validateEmail(structure.emailStructure)){
                            document.getElementById("erroremailStructure").innerText = "Cet email n'est pas valide";
                        }else {
                            document.getElementById("erroremailStructure").innerText = "";
                            if(structure.adrStructure.length < 4){
                                document.getElementById("erroradrStructure").innerText = "Le nombre de caractère minimum est 4.";
                            }else {
                                document.getElementById("erroradrStructure").innerText = "";
                                if (updateStructure(structure.idStructure,structure)) {
                                    Swal.fire({
                                        text: "La structure a étè modifier.",
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
                <li className="breadcrumb-item active">Modifier la structure</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { (apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 ) ?
                            (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Régie <span className="text-danger">*</span> :</label>
                                                <select defaultValue={apiDataGoverneds.filter(data => data.idRegie == structure.idRegie)[0] != undefined ? apiDataGoverneds.filter(data => data.idRegie == structure.idRegie)[0].idRegie :''} className="form-control" name="idRegie" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir une régie...</option>
                                                    {
                                                        apiDataGoverneds.map((data) => {
                                                            return(<option value={data.idRegie} key={data.idRegie}>{data.libelleRegie}</option>)
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
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => updateStructureConfrime() } data-toggle="button">Confirmer</button>
                                        </div>
                                    </div>
                                </>
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
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds:    state.governedReducer.governeds,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStructure: (id,structure) => dispatch(updateStructure(id,structure)),
        getAllGoverneds: ()   => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditStructure);