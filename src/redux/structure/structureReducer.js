import * as structureAction from "./structureAction";

const initialState = {
    loadingStructure: false,
    structures: {},
    error: null
}

const structureReducer = (state = initialState, action) => {
    switch (action.type) {
        case structureAction.GET_STRUCTURE_BEGIN:
            return {
                ...state,
                loadingStructure: action.payload.loadingStructure
            }
        case structureAction.GET_STRUCTURE_SUCCESS:
            return {
                ...state,
                structures: action.payload.structures
            }
        case structureAction.GET_STRUCTURE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default structureReducer;