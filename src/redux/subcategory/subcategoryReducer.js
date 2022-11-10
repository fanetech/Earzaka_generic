import * as categoryAction from "./subcategoryAction";

const initialState = {
    loadingSubcategory: false,
    subcategories: {},
    error: null
}

const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryAction.GET_SUBCATEGORY_BEGIN:
            return {
                ...state,
                loadingSubcategory: action.payload.loadingSubcategory
            }
        case categoryAction.GET_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                subcategories: action.payload.subcategories
            }
        case categoryAction.GET_SUBCATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default subcategoryReducer;