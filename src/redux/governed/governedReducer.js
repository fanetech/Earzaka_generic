import * as governedActions from "./governedAction";

const initialState = {
    loadingGoverned: false,
    governeds: {},
    error: null
}

const governedReducer = (state = initialState, action) => {
    switch (action.type) {
        case governedActions.GET_GOVERNED_BEGIN:
            return {
                ...state,
                loadingGoverned: action.payload.loadingGoverned
            }
        case governedActions.GET_GOVERNED_SUCCESS:
            return {
                ...state,
                governeds: action.payload.governeds
            }
        case governedActions.GET_GOVERNED_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default governedReducer;