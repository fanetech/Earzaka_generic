import { combineReducers } from 'redux';
import profileReducer from "./profile/profileReducer";
import governedReducer from "./governed/governedReducer";
import structureReducer from "./structure/structureReducer";
import userReducer from "./user/userReducer";
import categoryReducer from "./category/categoryReducer";
import subcategoryReducer from "./subcategory/subcategoryReducer";
import serviceReducer from "./service/serviceReducer";
import pointofserviceReducer from "./pointofservice/pointofserviceReducer";
import ticketReducer from "./ticket/ticketReducer";
import transactionoftypeReducer from "./transactionoftype/transactionoftypeReducer";
import meansofpaymentReducer from "./meansofpayment/meansofpaymentReducer";
import liquidationReducer from "./liquidation/liquidationReducer";
import demandeevaluationReducer from "./demandeevaluation/demandeevaluationReducer";
import evaluationReducer from "./evaluation/evaluationReducer";
import authReducer from "./auth/authReducer";



export default combineReducers({
    profileReducer,
    governedReducer,
    structureReducer,
    userReducer,
    categoryReducer,
    subcategoryReducer,
    serviceReducer,
    pointofserviceReducer,
    ticketReducer,
    transactionoftypeReducer,
    meansofpaymentReducer,
    liquidationReducer,
    authReducer,
    demandeevaluationReducer,
    evaluationReducer
})
