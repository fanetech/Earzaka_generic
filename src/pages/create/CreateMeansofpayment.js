import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createMeansofpayment } from '../../redux/meansofpayment/meansofpaymentAction';
import Swal from 'sweetalert2';

const CreateMeansofpayment = ({ createMeansofpayment }) => {

    const [meansofpayment, setMeansofpayment] = useState({ 'libelleMoyen': '' });

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setMeansofpayment({
            ...meansofpayment,
            [nam]: val
        });
    }

    const createGovernedConfrime = () => {
        if(meansofpayment.libelleMoyen.length < 2){
            document.getElementById("errorLibelleMoyen").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (createMeansofpayment(meansofpayment)) {
                Swal.fire({
                    text: "Un nouveau moyen de paiement a étè ajouter.",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.pathname = "/moyendepaiement";
                    }
                });
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Moyen de paiement</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau moyen de paiement</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-50">
                    <div className="card-body">
                        <div className="col-sm-12 col-md-12 mb-2">
                            <div className="form-group">
                                <label>Libelle <span className="text-danger">*</span> :</label>
                                <input type="text" className="form-control mt-2" name="libelleMoyen" value={meansofpayment.libelleMoyen} required onChange={(event) => myChangeHandler(event)} />
                                <small id="errorLibelleMoyen" className="text-danger"></small>
                            </div>
                            <div className="d-flex justify-content-center mt-2 p-2">
                                <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/typedetransaction">Annuler</Link>
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
        createMeansofpayment: (meansofpayment) => dispatch(createMeansofpayment(meansofpayment))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateMeansofpayment);