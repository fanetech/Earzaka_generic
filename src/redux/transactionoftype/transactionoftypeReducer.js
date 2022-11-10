import * as transactionoftypeActions from "./transactionoftypeAction";

const initialState = {
    loadingTransactionoftype: false,
    transactionoftypes: {},
    error: null
}

const transactionoftypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case transactionoftypeActions.GET_TRANSACTIONOFTYPE_BEGIN:
            return {
                ...state,
                loadingTransactionoftype: action.payload.loadingTransactionoftype
            }
        case transactionoftypeActions.GET_TRANSACTIONOFTYPE_SUCCESS:
            return {
                ...state,
                transactionoftypes: action.payload.transactionoftypes
            }
        case transactionoftypeActions.GET_TRANSACTIONOFTYPE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default transactionoftypeReducer;