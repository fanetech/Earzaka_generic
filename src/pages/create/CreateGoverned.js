import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGoverned } from '../../redux/governed/governedAction';
import Swal from 'sweetalert2';

const CreateGoverned = ({ createGoverned }) => {

    const [regie, setRegie] = useState({ 'libelleRegie': '' });

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setRegie({
            ...regie,
            [nam]: val
        });
    }

    const createGovernedConfrime = async () => {
        if(regie.libelleRegie.length < 2){
            document.getElementById("errorLibelleRegie").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (await createGoverned(regie) == true) {
                Swal.fire({
                    text: "Une nouvelle régie a étè ajouter.",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.pathname = "/regie";
                    }
                });
            }else{
                Swal.fire({
                    text: "Le libelle est déja utilisé. Veuillez vérifier les informations saisies.",
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

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Régie</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter une nouvelle régie</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-50">
                    <div className="card-body">
                        <div className="col-sm-12 col-md-12 mb-2">
                            <div className="form-group">
                                <label>Libelle <span className="text-danger">*</span> :</label>
                                <input type="text" className="form-control mt-2" name="libelleRegie" value={regie.libelleRegie} required onChange={(event) => myChangeHandler(event)} />
                                <small id="errorLibelleRegie" className="text-danger"></small>
                            </div>
                            <div className="d-flex justify-content-center mt-2 p-2">
                                <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/regie">Annuler</Link>
                                <button type="button" className="btn btn-primary" onClick={() => createGovernedConfrime()} data-toggle="button">Confirmer</button>
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
        createGoverned: (regie) => dispatch(createGoverned(regie))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateGoverned);