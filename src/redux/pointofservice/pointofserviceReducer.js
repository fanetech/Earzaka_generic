import * as pointofserviceAction from "./pointofserviceAction";

const initialState = {
    loadingPointofservice: false,
    pointofservices: {},
    error: null
}

const pointofserviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case pointofserviceAction.GET_POINTOFSERVICE_BEGIN:
            return {
                ...state,
                loadingPointofservice: action.payload.loadingPointofservice
            }
        case pointofserviceAction.GET_POINTOFSERVICE_SUCCESS:
            return {
                ...state,
                pointofservices: action.payload.pointofservices
            }
        case pointofserviceAction.GET_POINTOFSERVICE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default pointofserviceReducer;