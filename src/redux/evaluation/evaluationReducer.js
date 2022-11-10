import * as evaluationAction from "./evaluationAction";

const initialState = {
    loadingEvaluation: false,
    evaluations: {},
    error: null
}

const evaluationReducer = (state = initialState, action) => {
    switch (action.type) {
        case evaluationAction.GET_EVALUATION_BEGIN:
            return {
                ...state,
                loadingEvaluation: action.payload.loadingEvaluation
            }
        case evaluationAction.GET_EVALUATION_SUCCESS:
            return {
                ...state,
                evaluations: action.payload.evaluations
            }
        case evaluationAction.GET_EVALUATION_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default evaluationReducer;