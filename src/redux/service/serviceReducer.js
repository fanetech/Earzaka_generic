import * as serviceAction from "./serviceAction";

const initialState = {
    loadingService: false,
    services: {},
    error: null
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case serviceAction.GET_SERVICE_BEGIN:
            return {
                ...state,
                loadingService: action.payload.loadingService
            }
        case serviceAction.GET_SERVICE_SUCCESS:
            return {
                ...state,
                services: action.payload.services
            }
        case serviceAction.GET_SERVICE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default serviceReducer;