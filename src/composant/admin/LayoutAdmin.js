import React, { useEffect, useState } from 'react';
import { Header, Leftmenu, Footer } from '.';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/profile/profileAction';
import { getAllGoverneds } from '../../redux/governed/governedAction';
import { getAllStructures } from '../../redux/structure/structureAction';
import { getAllUsers } from '../../redux/user/userAction';
import { getAllCategorys} from '../../redux/category/categoryAction';
import { getAllSubcategorys } from '../../redux/subcategory/subcategoryAction';
import { getAllServices } from '../../redux/service/serviceAction';
import { getAllPointofservices } from '../../redux/pointofservice/pointofserviceAction';
import { getAllTickets } from '../../redux/ticket/ticketAction';
import { getAllTransactionoftypes } from '../../redux/transactionoftype/transactionoftypeAction';
import { getAllMeansofpayments } from '../../redux/meansofpayment/meansofpaymentAction';
import { getAllLiquidations } from '../../redux/liquidation/liquidationAction';
import { getAllDemandedemandeevaluations } from '../../redux/demandeevaluation/demandeevaluationAction';
import { getAllEvaluations } from '../../redux/evaluation/evaluationAction';
import methods from '../../constant';


const LayoutAdmin = ({ children, apiLoadingProfiles, apiLoadingGoverneds, apiLoadingStructures, apiLoadingUsers, apiLoadingCategories, apiLoadingSubcategories, apiLoadingServices, apiLoadingPointofservicess, apiLoadingTickets, apiLoadingTransactionoftypes, apiLoadingMeansofpayments, apiLoadingLiquidations, apiLoadingDemandeevaluation, apiLoadingEvaluation, getAllProfiles, getAllGoverneds, getAllStructures, getAllUsers, getAllCategorys, getAllSubcategorys, getAllServices, getAllPointofservices, getAllTickets, getAllTransactionoftypes, getAllMeansofpayments, getAllLiquidations, getAllDemandedemandeevaluations, getAllEvaluations }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (methods.getLocalStorage("user") == null) {
            window.location.pathname = "/connection";
        }

        if (methods.isExactMatch(window.location.pathname,"profil")) {
            if (!apiLoadingProfiles) {
                getAllProfiles();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"regie")) {
            if (!apiLoadingGoverneds) {
                getAllGoverneds();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"structure")) {
            if (!apiLoadingStructures) {
                getAllStructures();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"utilisateur")) {
            if (!apiLoadingUsers) {
                getAllUsers();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"categorie")) {
            if (!apiLoadingCategories) {
                getAllCategorys();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"souscategorie")) {
            if (!apiLoadingSubcategories) {
                getAllSubcategorys();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"service")) {
            if (!apiLoadingServices) {
                getAllServices();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"pointdeservice")) {
            if (!apiLoadingPointofservicess) {
                getAllPointofservices();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"guichet")) {
            if (!apiLoadingTickets) {
                getAllTickets();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"moyendepaiement")) {
            if (!apiLoadingMeansofpayments) {
                getAllMeansofpayments();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"liquidation")) {
            if (!apiLoadingLiquidations) {
                getAllLiquidations();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"demandeevaluation")) {
            if (!apiLoadingDemandeevaluation) {
                getAllDemandedemandeevaluations();
            }else{
                setLoading(false)
            }
        } else if (methods.isExactMatch(window.location.pathname,"evaluation")) {
            if (!apiLoadingEvaluation) {
                getAllEvaluations();
                if (!apiLoadingDemandeevaluation) {
                    getAllDemandedemandeevaluations();
                }
            }else{
                setLoading(false)
            }
        } else{
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
                            <div id="layoutSidenav">
                                <Leftmenu />
                                <div id="layoutSidenav_content">
                                    <main>
                                        {children}
                                    </main>
                                    <Footer />
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        apiLoadingProfiles: state.profileReducer.loadingProfile,
        apiLoadingGoverneds: state.governedReducer.loadingGoverned,
        apiLoadingStructures: state.structureReducer.loadingStructure,
        apiLoadingUsers: state.userReducer.loadingUser,
        apiLoadingCategories: state.categoryReducer.loadingCategory,
        apiLoadingSubcategories: state.subcategoryReducer.loadingSubcategory,
        apiLoadingServices: state.serviceReducer.loadingService,
        apiLoadingPointofservicess: state.pointofserviceReducer.loadingPointofservice,
        apiLoadingTickets: state.ticketReducer.loadingTicket,
        apiLoadingTransactionoftypes: state.transactionoftypeReducer.loadingTransactionoftype,
        apiLoadingMeansofpayments: state.meansofpaymentReducer.loadingMeansofpayment,
        apiLoadingLiquidations: state.liquidationReducer.loadingLiquidation,
        apiLoadingDemandeevaluation: state.demandeevaluationReducer.loadingDemandeevaluation,
        apiLoadingEvaluation: state.evaluationReducer.loadingEvaluation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProfiles: () => dispatch(getAllProfiles()),
        getAllGoverneds: ()         => dispatch(getAllGoverneds()),
        getAllStructures: ()   => dispatch(getAllStructures()),
        getAllUsers: () => dispatch(getAllUsers()),
        getAllCategorys: ()   => dispatch(getAllCategorys()),
        getAllSubcategorys: ()   => dispatch(getAllSubcategorys()),
        getAllServices: ()   => dispatch(getAllServices()),
        getAllPointofservices: ()   => dispatch(getAllPointofservices()),
        getAllTickets: ()   => dispatch(getAllTickets()),
        getAllTransactionoftypes: ()         => dispatch(getAllTransactionoftypes()),
        getAllMeansofpayments: ()         => dispatch(getAllMeansofpayments()),
        getAllLiquidations: ()         => dispatch(getAllLiquidations()),
        getAllDemandedemandeevaluations: ()         => dispatch(getAllDemandedemandeevaluations()),
        getAllEvaluations: ()         => dispatch(getAllEvaluations()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutAdmin)