import * as demandeevaluationAction from "./demandeevaluationAction";

const initialState = {
    loadingDemandeevaluation: false,
    demandeevaluations: {},
    error: null
}

const demandeevaluationReducer = (state = initialState, action) => {
    switch (action.type) {
        case demandeevaluationAction.GET_DEMANDEEVALUATION_BEGIN:
            return {
                ...state,
                loadingDemandeevaluation: action.payload.loadingDemandeevaluation
            }
        case demandeevaluationAction.GET_DEMANDEEVALUATION_SUCCESS:
            return {
                ...state,
                demandeevaluations: action.payload.demandeevaluations
            }
        case demandeevaluationAction.GET_DEMANDEEVALUATION_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default demandeevaluationReducer;