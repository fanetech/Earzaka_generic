import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllStructures } from '../../redux/structure/structureAction';
import { getAllGoverneds } from '../../redux/governed/governedAction';


const ShowStructure = ({ apiLoadingGoverneds, getAllGoverneds, apiDataGoverneds, apiLoadingStructures, apiDataStructures, getAllStructures }) => {

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


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Structure</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Afficher la structure</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        { (apiLoadingGoverneds && Object.keys(apiDataGoverneds).length > 0 && apiLoadingStructures && Object.keys(apiDataStructures).length > 0 ) ?
                            (
                                <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Régie : </h6>{apiDataGoverneds.filter(data => data.idRegie == structure.idRegie)[0].libelleRegie}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Nom de la structure : </h6>{structure.nomStructure}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Localité : </h6>{structure.localiteStructure}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Téléphone : </h6>{structure.telStructure}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Email : </h6>{structure.emailStructure}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Adresse : </h6>{structure.adrStructure}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/structure">Retour</Link>
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
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiDataGoverneds:    state.governedReducer.governeds,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiDataStructures: state.structureReducer.structures
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllGoverneds: ()   => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowStructure);