import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTickets } from '../../redux/ticket/ticketAction';
import { getAllPointofservices } from '../../redux/pointofservice/pointofserviceAction';


const ShowTicket = ({ apiLoadingPointofservices, getAllPointofservices, apiDataPointofservices, getAllTickets, apiLoadingTickets, apiDataTickets }) => {

    let { id } = useParams();

    const [guichet, setGuichet] = useState({ 'idPS': '', 'libelleGuichet': '', 'telGuichet': '', 'emailGuichet': '', 'adrGuichet': ''});

    useEffect(() => {
        if (!apiLoadingPointofservices) {
            getAllPointofservices();
        }

        if (!apiLoadingTickets) {
            getAllTickets();
        }

        if (apiLoadingTickets) {
            let dataUpdate = apiDataTickets.filter(data => data.idGuichet == id);
            if(dataUpdate.length == 1){
                setGuichet(dataUpdate[0])
            }
        }
    },[])


    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Guichet</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Afficher le guichet</li>
            </ol>
            <div className="row justify-content-center">
                <div className="card mb-4 mt-4 w-75">
                    <div className="card-body">
                        {apiLoadingPointofservices && Object.keys(apiDataPointofservices).length > 0 && apiLoadingTickets && Object.keys(apiDataTickets).length > 0  ?
                            (
                                <div className="col-sm-12 col-md-12 mb-2 mt-1 styleformule">
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Point de service : </h6>{apiDataPointofservices.filter(data => data.idPS == guichet.idPS)[0].libellePS}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Libelle : </h6>{guichet.libelleGuichet}
                                        </div>
                                        <div className="col-md-4">
                                            <h6>Téléphone : </h6>{guichet.telGuichet}
                                        </div>
                                    </div>
                                    <div className="row mb-3 text-center">
                                        <div className="col-md-4">
                                            <h6>Email : </h6>{guichet.emailGuichet}
                                        </div>
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4">
                                            <h6>Adresse : </h6>{guichet.adrGuichet}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 p-2">
                                        <Link type="button" className="btn btn-secondary me-1" data-toggle="button" to="/guichet">Retour</Link>
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
        apiDataPointofservices: state.pointofserviceReducer.pointofservices,
        apiLoadingTickets: state.ticketReducer.loadingTicket,
        apiDataTickets: state.ticketReducer.tickets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPointofservices: () => dispatch(getAllPointofservices()),
        getAllTickets: ()   => dispatch(getAllTickets())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowTicket);