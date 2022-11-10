import * as meansofpaymentActions from "./meansofpaymentAction";

const initialState = {
    loadingMeansofpayment: false,
    meansofpayments: {},
    error: null
}

const meansofpaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case meansofpaymentActions.GET_MEANSOFPAYMENT_BEGIN:
            return {
                ...state,
                loadingMeansofpayment: action.payload.loadingMeansofpayment
            }
        case meansofpaymentActions.GET_MEANSOFPAYMENT_SUCCESS:
            return {
                ...state,
                meansofpayments: action.payload.meansofpayments
            }
        case meansofpaymentActions.GET_MEANSOFPAYMENT_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default meansofpaymentReducer;