import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPointofservices } from '../../redux/pointofservice/pointofserviceAction';


const ShowPointofservice = ({apiLoadingPointofservices, apiDataPointofservices, getAllPointofservices}) => {

    let { id } = useParams();

    const [pointofservice, setPointofservice] = useState({ 'libellePS':'', 'telPS':'', 'emailPS':'', 'adrPS':'', 'respPS':'', 'telRespPS':'', 'emailRespPS':'', 'numRC':'', 'numIFU':'', 'numCptePS':'', 'typePS':''});

    useEffect(() => {
        if (!apiLoadingPointofservices) {
            getAllPointofservices();
        }

        if (apiLoadingPointofservices) {
            let dataUpdate = apiDataPointofservices.filter(data => data.idPS == id);
            if(dataUpdate.length == 1){
                setPointofservice(dataUpdate[0])
            }
        }

    },[])

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Point de Service</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Afficher le point de service</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { (apiLoadingPointofservices && Object.keys(apiDataPointofservices).length > 0 ) ?
                            (
                                <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Libelle : </h6>{pointofservice.libellePS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Téléphone : </h6>{pointofservice.telPS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Email : </h6>{pointofservice.emailPS}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Adresse : </h6>{pointofservice.adrPS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Responsable : </h6>{pointofservice.respPS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Téléphone du responsable : </h6>{pointofservice.telRespPS}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Email du responsable : </h6>{pointofservice.emailRespPS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Numéro RC : </h6>{pointofservice.numRC}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Numéro IFU : </h6>{pointofservice.numIFU}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Numéro du compte : </h6>{pointofservice.numCptePS}
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <h6>Type : </h6>{pointofservice.typePS}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/pointdeservice">Retour</Link>
                                    </div>
                                </div>
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
        apiLoadingPointofservices: state.pointofserviceReducer.loadingPointofservice,
        apiDataPointofservices: state.pointofserviceReducer.pointofservices
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPointofservices: ()   => dispatch(getAllPointofservices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPointofservice);