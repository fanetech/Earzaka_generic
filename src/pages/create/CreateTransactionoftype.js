import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTransactionoftype } from '../../redux/transactionoftype/transactionoftypeAction';
import Swal from 'sweetalert2';

const CreateTransactionoftype = ({ createTransactionoftype }) => {

    const [transactionoftype, setTransactionoftype] = useState({ 'libelleTypeTrans': '' });

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setTransactionoftype({
            ...transactionoftype,
            [nam]: val
        });
    }

    const createGovernedConfrime = () => {
        if(transactionoftype.libelleTypeTrans.length < 2){
            document.getElementById("errorLibelleRegie").innerText = "Le nombre de caractère minimum est 2."
        }else{
            if (createTransactionoftype(transactionoftype)) {
                Swal.fire({
                    text: "Un nouveau type de transaction a étè ajouter.",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn btn-success"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        window.location.pathname = "/typedetransaction";
                    }
                });
            }
        }
    }

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Type de Transaction</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau type de transaction</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-50">
                    <div className="card-body">
                        <div className="col-sm-12 col-md-12 mb-2">
                            <div className="form-group">
                                <label>Libelle <span className="text-danger">*</span> :</label>
                                <input type="text" className="form-control mt-2" name="libelleTypeTrans" value={transactionoftype.libelleTypeTrans} required onChange={(event) => myChangeHandler(event)} />
                                <small id="errorLibelleRegie" className="text-danger"></small>
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
        createTransactionoftype: (transactionoftype) => dispatch(createTransactionoftype(transactionoftype))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateTransactionoftype);