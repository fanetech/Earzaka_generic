import React, { useEffect, useState } from 'react';
import { Header, Footer } from './';
import { connect } from 'react-redux';
import { getAllLiquidations } from '../../redux/liquidation/liquidationAction';
import { getAllDemandedemandeevaluations } from '../../redux/demandeevaluation/demandeevaluationAction';
import { getAllEvaluations } from '../../redux/evaluation/evaluationAction';
import { getAllServices } from '../../redux/service/serviceAction';
import methods from '../../constant';


const LayoutClient = ({ children, apiLoadingLiquidations, apiLoadingDemandeevaluation, apiLoadingEvaluation, apiLoadingServices, getAllLiquidations, getAllDemandedemandeevaluations, getAllEvaluations }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (methods.isExactMatch(window.location.pathname,"accueil")) {
            setLoading(false)
        }else if (methods.isExactMatch(window.location.pathname,"effectuerliquidation")) {
            setLoading(false)
        }else if (methods.isExactMatch(window.location.pathname,"effectuerdemandeevaluation")) {
            if (!apiLoadingDemandeevaluation) {
                getAllDemandedemandeevaluations();
            }else{
                setLoading(false)
            }
        }else if (methods.isExactMatch(window.location.pathname,"traitedemandeevaluation")) {
            if (!apiLoadingDemandeevaluation) {
                getAllDemandedemandeevaluations();
            }else{
                setLoading(false)
            }
        }else if (methods.isExactMatch(window.location.pathname,"historique")) {
            if (!apiLoadingLiquidations) {
                getAllLiquidations();
            }else{
                setLoading(false)
            }
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    })

    return (
        <>
            {
                loading ? 
                    (
                        <div className="d-flex justify-content-center align-items-center text-center vh-100">
                            <div className="spinner-grow text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-secondary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-danger" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-warning" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-info" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            <div className="spinner-grow text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                    :
                    (
                        <>
                            <Header />
                                <div id="main_content">
                                    <main>
                                        {children}
                                    </main>
                                </div>
                            <Footer />
                        </>
                    )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingLiquidations: state.liquidationReducer.loadingLiquidation,
        apiLoadingDemandeevaluation: state.demandeevaluationReducer.loadingDemandeevaluation,
        apiLoadingEvaluation: state.evaluationReducer.loadingEvaluation,
        apiLoadingServices: state.serviceReducer.loadingService,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLiquidations: ()         => dispatch(getAllLiquidations()),
        getAllDemandedemandeevaluations: ()         => dispatch(getAllDemandedemandeevaluations()),
        getAllEvaluations: ()         => dispatch(getAllEvaluations()),
        getAllServices: ()   => dispatch(getAllServices()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutClient)