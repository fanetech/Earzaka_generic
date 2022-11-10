import React, { useState, useEffect, Fragment } from 'react';
import { MultiSelect } from "react-multi-select-component";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createLiquidation } from '../redux/liquidation/liquidationAction';
import Swal from 'sweetalert2';
import money from '../assets/images/money.jpg';
import { getAllServices } from '../redux/service/serviceAction';
import methods from '../constant';
import { QRCode } from "react-qr-svg";
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

const PraestareClearance = ({ createLiquidation, getAllServices, apiLoadingServices, apiDataServices }) => {

    const [options, setOptions] = useState([]);

    const [showMtn, setShowMtn] = useState(false);

    const [showRecu, setShowRecu] = useState(false);


    useEffect(() => {
        if (!apiLoadingServices) {
            getAllServices();
        } else {
            let optionsArray = [];
            apiDataServices.map(data => {
                optionsArray.push({ label: data.labels[0].charAt(0).toUpperCase() + data.labels[0].slice(1), value: data.id })
            })
            setOptions(optionsArray)
        }
    }, [apiDataServices]);

    useEffect(() => {
        if(document.getElementById('montantLiqID') !==null && document.getElementById('montantLiqID').value.length > 0){
            setShowMtn(true)
        }else{
            setShowMtn(false)
        }
    })

    const [selected, setSelected] = useState([]);

    const [liquidation, setLiquidation] = useState({ 'nomClient': '', 'numTelClient': '', 'idRegie':methods.dataUser().idRegie, 'idStructure':methods.dataUser().idStructure, 'idAgent': methods.dataUser().idAgent, 'refLiq': 'xxxxxx', 'servicesLiq': [], 'montantLiq':'' });

    const [step, setStep] = useState(0);

    const [show, setShow] = useState(true);

    const [showResume, setShowResume] = useState(false);

    const handleChangeStep = (e) => {
        e.target.value === "prev" && step == 0 && setShow(true);
        e.target.value === "prev" && step > 0 && setStep(step - 1);
        e.target.value === "next" &&
            step < selected.length &&
            setStep(step + 1);
    };

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        setLiquidation({
            ...liquidation,
            [nam]: val
        });
        console.log(liquidation);
    }

    const onchangeInputMtn = (val, index) =>{
        let temp = liquidation.servicesLiq;
        temp[index] = {'idService':selected[index].value,'nomService':selected[index].label,'montantService':val.target.value};
        setLiquidation({
            ...liquidation,
            'servicesLiq':temp
        });
        console.log(liquidation)
    }

    const createLiquidationConfrime = async () => {
        const result = await createLiquidation(liquidation);
        if (result.statut != undefined && result.statut == true) {
            setLiquidation({
                ...liquidation,
                'refLiq':result.ref
            });
            Swal.fire({
                text: "Une liquidation a étè effectuer.",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success"
                }
            }).then(function (result) {
                if (result.isConfirmed) {
                    setShowRecu(true)
                }
            });
        } else {
            Swal.fire({
                text: "Un problème est survenu lors de l'enregistrement. Veuillez vérifier les informations saisies.",
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

    const calTotal = () => {
        let somme = 0;

        liquidation.servicesLiq.forEach(data => {
            somme += parseInt(data.montantService);
        })
        return somme;
    }

    const printDocument = () => {
        const div = document.getElementById('tagertQR');
        let s = new XMLSerializer();
        const svg = div.querySelector("svg");
        let str = s.serializeToString(svg);
        div.parentNode.removeChild(div);
        const pdfTable = document.getElementById('divToPrint');
        var html = htmlToPdfmake(pdfTable.innerHTML);
        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;

        documentDefinition.content.push({
            svg: str,
            width: 150,
            alignment: 'right',
        });

        documentDefinition.content.push({
            text: "© Tous droits réservés | Arzeka",
            alignment: 'center',
            style:['html-p']
        });
        pdfMake.createPdf(documentDefinition).open();
    }

    let dateActuelle = new Date();

    return (
        <div className="container-fluid px-4">
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    {
                        !showResume ?
                        (
                            <div className="card-body">
                                <div className="row">
                                    <h3 className="text-center mt-2 mb-4">Liquidation</h3>
                                </div>
                                <div className="row mb-2 mt-2">
                                    <div className="d-none d-md-block col-md-5">
                                        <img src={money} className="w-100 h-100" style={{ objectFit: "cover" }} />
                                    </div>
                                    <div className="col-sm-12 col-md-7">
                                        <div className="row mb-2">
                                            {
                                                show ?
                                                    (
                                                        <>
                                                            <div className="col-sm-12 col-md-12 mb-4">
                                                                <div className="form-group">
                                                                    <label className="control-label fw-bold">Service <span className="text-danger">*</span> :</label>
                                                                    <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Sélectionner" overrideStrings={{ "allItemsAreSelected": "Tous les éléments sont sélectionnés.", "clearSearch": "Effacer la recherche", "clearSelected": "Effacer la sélection", "noOptions": "Aucune option", "search": "Recherche", "selectAll": "Tout sélectionner", "selectAllFiltered": "Tout sélectionner (Filtré)", "selectSomeItems": "Sélectionner...", "create": "Créer" }} />
                                                                    <small id="errornumService" className="text-danger"></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-12 mb-2">
                                                                <div className="form-group">
                                                                    <label className="control-label fw-bold">Nom complet <span className="text-danger">*</span> :</label>
                                                                    <input type="text" className="form-control mt-2" name="nomClient" value={liquidation.nomClient} required onChange={(event) => myChangeHandler(event)} />
                                                                    <small id="errornumTelClient" className="text-danger"></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-12 mb-2">
                                                                <div className="form-group">
                                                                    <label className="control-label fw-bold">Téléphone du client <span className="text-danger">*</span> :</label>
                                                                    <input type="text" className="form-control mt-2" name="numTelClient" value={liquidation.numTelClient} required onChange={(event) => myChangeHandler(event)} />
                                                                    <small id="errornumTelClient" className="text-danger"></small>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="col-sm-12 col-md-12 mb-5 rounded-pill" style={{ background: "#dbdbd9" }}>
                                                                <ul className="step d-flex flex-nowrap">
                                                                    {selected.map((_, index) => (
                                                                        <Fragment key={index}>
                                                                            {index <= step ? (
                                                                                index === step ? (
                                                                                    <li className="step-item active">
                                                                                        <a style={{ color: "#db7777" }} >{_.label}</a>
                                                                                    </li>
                                                                                ) : (
                                                                                    <li className="step-item">
                                                                                        <a style={{ color: "green" }} >{_.label}</a>
                                                                                    </li>
                                                                                )
                                                                            ) : (
                                                                                <li className="step-item">
                                                                                    <a style={{ color: "grey" }} >{_.label}</a>
                                                                                </li>
                                                                            )}
                                                                        </Fragment>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                            <div className="col-sm-12 col-md-12 mb-4 mt-2">
                                                                <h5 className="fw-bold">Nom du service: <span>{selected[step].label}</span></h5>
                                                            </div>
                                                            <div className="col-sm-12 col-md-12 mb-2">
                                                                <div className="form-group">
                                                                    <label className="control-label fw-bold">Montant <span className="text-danger">*</span> :</label>
                                                                    <div className="row" style={{"--bs-gutter-x": "none"}}>
                                                                        <div className="col-sm-10 col-md-10">
                                                                            <input type="number" id="montantLiqID"  className="form-control mt-2" value={ (liquidation.servicesLiq[step] === undefined) ? "":liquidation.servicesLiq[step].montantService} required onChange={(val)=>{onchangeInputMtn(val, step)}} />
                                                                        </div>
                                                                        <div className="col-sm-2 col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                            <span className="fs-5 fw-bold mt-2">F CFA</span>
                                                                        </div>
                                                                    </div>
                                                                    <small id="errormontantLiq" className="text-danger"></small>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/">Annuler</Link>
                                        {
                                            selected.length > 0 && liquidation.numTelClient.length >= 8 && liquidation.nomClient.length >=2 ?
                                                (
                                                    <>
                                                        {
                                                            show ? (
                                                                <a type="button" className="btn text-white me-1" style={{ background: "#98c73a" }} onClick={() => setShow(false)} data-toggle="button">Suivant</a>
                                                            ) : (
                                                                <>
                                                                    <button type="button" className="btn text-white me-1" style={{ background: "#98c73a", boxShadow: "none" }} value="prev" onClick={handleChangeStep} >Précédent</button>
                                                                    {
                                                                        (showMtn) ?
                                                                            (   
                                                                                ((selected.length - 1) == step) ?
                                                                                    (
                                                                                        <button type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => (setShowResume(true), setLiquidation({ ...liquidation, 'montantLiq':calTotal() }))} data-toggle="button">Soumettre</button>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <button type="button" className="btn text-white me-1" style={{ background: "#98c73a", boxShadow: "none" }} value="next" onClick={handleChangeStep} >Suivant</button>
                                                                                    )
                                                                            ):"" 
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="card-body">
                                <div className="row">
                                    <h3 className="text-center mt-2 mb-4">Résumer sur la Liquidation</h3>
                                </div>
                                <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                    <div className="row">
                                        <h5 className="text-center mt-2 mb-4 fw-bold">Information sur le client</h5>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-6">
                                            <h6>Nom et Prénom : </h6>{liquidation.nomClient}
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Téléphone : </h6>{liquidation.numTelClient}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h5 className="text-center mt-2 mb-4 fw-bold">Information sur la liquidation</h5>
                                    </div>

                                    <div className="row mb-3">
                                        <table className="table table-striped">
                                            <thead className="text-white text-center" style={{ background: "#033d7c" }}>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Nom du service </th>
                                                    <th scope="col">Montant</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    liquidation.servicesLiq.map((data,index) => {
                                                        let numbr = index+1;
                                                        return(
                                                                <tr className="text-center" key={index}>
                                                                    <td>{numbr}</td>
                                                                    <td><h6 className="fw-bold">{data.nomService}</h6></td>
                                                                    <td><h6 className="fw-bold">{data.montantService} F CFA</h6></td>
                                                                </tr>
                                                            )
                                                        })
                                                }
                                                <tr className="text-center">
                                                    <td><h4 className="fw-bold">Montant Total: </h4></td>
                                                    <td></td>
                                                    <td>
                                                        <h4 className="fw-bold">{ calTotal() }  F CFA</h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        {
                                            showRecu ?
                                            (
                                                <>
                                                    <a type="button" className="btn btn-secondary me-1" onClick={() => window.location.reload()}>Terminer</a>
                                                    <a type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() =>printDocument()} data-toggle="button">Exporter vers PDF</a>
                                                </>
                                            ):
                                            (
                                                <>
                                                    <a type="button" className="btn btn-secondary me-1" onClick={() => setShowResume(false)}>Retour</a>
                                                    <a type="button" className="btn text-white" style={{ background: "#033d7c" }} onClick={() => createLiquidationConfrime()} data-toggle="button">Valider</a>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div id="divToPrint" className="m-3 d-none">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="d-flex flex-row p-2 justify-content-between">
                                <img style={{ width: "100px" }} src={methods.reculogo} />
                                <p style={{ textAlign: 'center', marginLeft: '37rem'}}>{('0'+dateActuelle.getDate()).slice(-2)+"/"+('0'+(dateActuelle.getMonth()+1)).slice(-2)+"/"+dateActuelle.getFullYear()}</p>
                            </div>
                            <h2 style={{ textAlign: 'center'}}>RECU DE LIQUIDATION</h2>
                            <h5 style={{ textAlign: 'center'}}>N° {liquidation.refLiq}</h5>
                            <hr />
                            <div className="row">
                                <div className="col-sm-6 col-md-6 col-lg-6 px-5">
                                    <h6 className="">Nom :...........................................................................  {liquidation.nomClient}</h6>
                                    <h6 className="text-start">Téléphone :..................................................................  {liquidation.numTelClient}</h6>
                                    {
                                        liquidation.servicesLiq.map((data,index) => {
                                            return(
                                                <h6 className="text-start" key={index}>{data.nomService} :..............................................................................{data.montantService} F CFA</h6>
                                            )
                                        })
                                    }
                                    <h6 className="text-start">Montant Total :..........................................................  {liquidation.montantLiq} F CFA</h6>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6" id='tagertQR'>
                                    <QRCode bgColor="#FFFFFF" fgColor="#000000" level="Q" style={{ width: '100%' }} value="some text" />
                                </div>
                            </div>
                            <hr />
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
        apiDataServices: state.serviceReducer.services
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createLiquidation: (liquidation) => dispatch(createLiquidation(liquidation)),
        getAllServices: () => dispatch(getAllServices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PraestareClearance);