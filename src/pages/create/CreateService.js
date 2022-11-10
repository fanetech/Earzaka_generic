import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createService } from '../../redux/service/serviceAction';
import { getAllSubcategorys } from '../../redux/subcategory/subcategoryAction';
import methods from '../../constant';
import Swal from 'sweetalert2';

const INPUT_TIMEOUT = 250;

const CreateService = ({ createService, apiLoadingSubcategories, getAllSubcategorys, apiDataSubcategories }) => {

    useEffect(() => {
        if (!apiLoadingSubcategories) {
            getAllSubcategorys();
        }
    })


    const material_icons = methods.icones;
    const [material_Resultat, setMaterial_Resultat] = useState([]);
    const [service, setService] = useState({ 'subCategoryId': '', 'labels': ['',''], 'amount': 0, 'calculationMethod': 'Automatique', 'iconName': '', 'fields': '' });
    const [seachEl,setSeachEl] = useState('');
    const [afficheIcon,setAfficheIcon] = useState(false);
    const [formValues, setFormValues] = useState([{ key: "", type : "", labels: ['',''] }])

    const getPredictions = (value) => {
        return methods.icones.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setService({
            ...service,
            [nam]: val
        });
    }

    const seacherEffect = (event) => {
        let val = event.target.value;
        setSeachEl(val);
        if (val.length > 0) {
            setTimeout(() => {
                setMaterial_Resultat(getPredictions(val));
            }, INPUT_TIMEOUT);
        } else {
            setMaterial_Resultat([]);
        }
    }

    const myChangeHandler0 = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setService({
            ...service,
            'labels': [( nam=='labels[0]' ) ? val:service.labels[0], ( nam=='labels[1]' ) ? val:service.labels[1]]
        });
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        setService({
            ...service,
            'fields':formValues
        })
    }

    const handleChange0 = (i,e) => {
        let nam = e.target.name;
        let val = e.target.value;
        let newFormValues = [...formValues];
        newFormValues[i]["labels"] = [( nam=='labels[0]' ) ? val:formValues[i].labels[0], ( nam=='labels[1]' ) ? val:formValues[i].labels[1]];
        setFormValues(newFormValues);
        setService({
            ...service,
            'fields':formValues
        })
    }
    

    let addFormFields = () => {
        setFormValues([...formValues, { key: "", type : "", labels: ['',''] }])
    }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const CreateSubCategoryConfrime = () => {
        if(service.subCategoryId.length < 1){
            document.getElementById("erroridService").innerText = "Veuillez choisir une régie."
        }else{
            document.getElementById("erroridService").innerText = "";
            if(service.labels[0].length < 2){
                document.getElementById("errorlibelleFr").innerText = "Le nombre de caractère minimum est 2.";
            }else {
                document.getElementById("errorlibelleFr").innerText = "";
                if(service.labels[1].length < 2){
                    document.getElementById("errorlibelleAg").innerText = "Le nombre de caractère minimum est 2.";
                }else {
                    document.getElementById("errorlibelleAg").innerText = "";
                    if(service.iconName.length < 2){
                        document.getElementById("erroriconeIll").innerText = "Le nombre de caractère minimum est 2.";
                    }else {
                        document.getElementById("erroriconeIll").innerText = "";
                        if (service.amount < 0 ) {
                            document.getElementById("erroramount").innerText = "Le montant minimum est 0.";
                        } else {
                            document.getElementById("erroramount").innerText = "";
                            if (service.calculationMethod.length < 2 ) {
                                document.getElementById("errorcalculationMethod").innerText = "Le nombre de caractère minimum est 2.";
                            } else {
                                document.getElementById("errorcalculationMethod").innerText = "";
                                if (createService(service)) {
                                    Swal.fire({
                                        text: "Un nouveau service a étè ajouter.",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "OK",
                                        customClass: {
                                            confirmButton: "btn btn-success"
                                        }
                                    }).then(function (result) {
                                        if (result.isConfirmed) {
                                            window.location.pathname = "/service";
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
            <h1 className="mt-4">Service</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Ajouter un nouveau service</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { apiLoadingSubcategories && Object.keys(apiDataSubcategories).length > 0 ?
                            (
                                <>
                                    <div className="row mb-2">
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Sous catégorie <span className="text-danger">*</span> :</label>
                                                <select className="form-control mt-2" name="subCategoryId" onChange={(event) => myChangeHandler(event)}>
                                                    <option value={''}>Choisir une sous catégorie...</option>
                                                    {
                                                        apiDataSubcategories.map((data) => {
                                                            return(<option value={data.id} key={data.id}>{data.labels[0]}</option>)
                                                        })
                                                    }
                                                </select>
                                                <small id="erroridService" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Libelle en Français <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="labels[0]" value={service.labels[0]} required onChange={(event) => myChangeHandler0(event)} />
                                                <small id="errorlibelleFr" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Libelle en Anglais <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="labels[1]" value={service.labels[1]} required onChange={(event) => myChangeHandler0(event)} />
                                                <small id="errorlibelleAg" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        {
                                            afficheIcon ?
                                            (
                                                <div>
                                                    <div className="d-flex justify-content-between align-content-center align-items-center mb-4">
                                                        <h5>Choisir une icône illustratoire</h5>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control mt-2" name="seacher" placeholder="Recherché une icône" value={seachEl} onChange={(event) => seacherEffect(event)} />
                                                        </div>
                                                        <button type="button" onClick={() => setAfficheIcon(false)} className="btn btn-close"></button>
                                                    </div>
                                                    <div className="row mb-2 overflow-auto h-25-icone py-2">
                                                        {
                                                            seachEl.length > 1 ? 
                                                            (
                                                                material_Resultat.map((data,index) => {
                                                                    return (
                                                                        <div key={index} className="col-sm-2 col-md-2 mb-2 text-center">
                                                                            <span className="material-icons" onClick={() =>(setService({...service,'iconName': data}),setAfficheIcon(false))} style={{cursor: "pointer"}}>{data}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            ):
                                                            (
                                                                material_icons.map((data,index) => {
                                                                    return (
                                                                        <div key={index} className="col-sm-2 col-md-2 mb-2 text-center">
                                                                            <span className="material-icons" onClick={() =>(setService({...service,'iconName': data}),setAfficheIcon(false))} style={{cursor: "pointer"}}>{data}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ):""
                                        }
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Icône Illustration <span className="text-danger">*</span> :</label>
                                                <div className="row" style={{"--bs-gutter-x": "none"}}>
                                                    <div className="col-sm-10 col-md-10">
                                                        <input type="text" onClick={() => setAfficheIcon(true)} className="form-control mt-2" name="iconName" value={service.iconName} required onChange={(event) => myChangeHandler(event)} />
                                                    </div>
                                                    <div className="col-sm-2 col-md-2 text-center">
                                                        <span className="material-icons mt-2">{service.iconName}</span>
                                                    </div>
                                                </div>
                                                <small id="erroriconeIll" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Montant(F CFA) <span className="text-danger">*</span> :</label>
                                                <input type="text" className="form-control mt-2" name="amount" value={service.amount} required onChange={(event) => myChangeHandler(event)} />
                                                <small id="erroramount" className="text-danger"></small>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-4 mb-2">
                                            <div className="form-group">
                                                <label>Méthode de calcul <span className="text-danger">*</span> :</label>
                                                <select className="form-control mt-2" name="calculationMethod" onChange={(event) => myChangeHandler(event)}>
                                                    <option selected value='Automatique'>Automatique</option>
                                                    <option value='Manuel'>Manuel</option>
                                                </select>
                                                <small id="errorcalculationMethod" className="text-danger"></small>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-center my-2">Données</h3>
                                    {formValues.map((element, index) => (
                                        <div className="row mb-2" key={index}>
                                            <div className="col-sm-12 col-md-2 mb-2">
                                                <div className="form-group">
                                                    <label>Id <span className="text-danger">*</span> :</label>
                                                    <input type="text" className="form-control mt-2" name="key" value={element.key || ""} onChange={e => handleChange(index, e)} />
                                                    <small id="errorkey" className="text-danger"></small>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-3 mb-2">
                                                <div className="form-group">
                                                    <label>Type <span className="text-danger">*</span> :</label>
                                                    <select className="form-control mt-2" name="type" onChange={e => handleChange(index, e)}>
                                                        <option value="text_field">Text Field</option>
                                                        <option value="select">Select</option>
                                                        <option value="checkbox">Checkbox</option>
                                                    </select>
                                                    <small id="errortype" className="text-danger"></small>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-3 mb-2">
                                                <div className="form-group">
                                                    <label>Libelle en Français <span className="text-danger">*</span> :</label>
                                                    <input type="text" className="form-control mt-2" name="labels[0]" value={element.labels[0]} required onChange={e => handleChange0(index, e)} />
                                                    <small id="errorlibelleFrd" className="text-danger"></small>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-3 mb-2">
                                                <div className="form-group">
                                                    <label>Libelle en Anglais <span className="text-danger">*</span> :</label>
                                                    <input type="text" className="form-control mt-2" name="labels[1]" value={element.labels[1]} required onChange={e => handleChange0(index, e)} />
                                                    <small id="errorlibelleEnd" className="text-danger"></small>
                                                </div>
                                            </div>
                                            {
                                                index ? 
                                                    <div className="d-flex col-sm-12 col-md-1 mb-2 justify-content-center align-content-center align-items-center m-auto">
                                                        {
                                                            (formValues.length == (index+1)) ?
                                                                <button type="button"  className="btn btn-success btn-sm me-1" onClick={() => addFormFields()}><i className="fas fa-plus"></i></button> 
                                                                :null
                                                        }
                                                        <button type="button"  className="btn btn-danger btn-sm" onClick={() => removeFormFields(index)}><i className="fas fa-trash"></i></button> 
                                                    </div>
                                                    :   
                                                    <div className="d-flex col-sm-12 col-md-1 mb-2 justify-content-center align-content-center align-items-center m-auto">
                                                        {
                                                            (formValues.length == (index+1)) ?
                                                                <button type="button"  className="btn btn-success btn-sm me-1" onClick={() => addFormFields()}><i className="fas fa-plus"></i></button> 
                                                                :null
                                                        }
                                                    </div>
                                            }
                                        </div>
                                        ))
                                    }
                                    <div className="row">
                                        <div className="d-flex justify-content-center mt-2 p-2">
                                            <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/service">Annuler</Link>
                                            <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => CreateSubCategoryConfrime() } data-toggle="button">Confirmer</button>
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
        apiLoadingSubcategories: state.subcategoryReducer.loadingSubcategory,
        apiDataSubcategories: state.subcategoryReducer.subcategories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createService: (service) => dispatch(createService(service)),
        getAllSubcategorys: ()   => dispatch(getAllSubcategorys()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateService);