import * as categoryAction from "./categoryAction";

const initialState = {
    loadingCategory: false,
    categories: {},
    error: null
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryAction.GET_CATEGORY_BEGIN:
            return {
                ...state,
                loadingCategory: action.payload.loadingCategory
            }
        case categoryAction.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories
            }
        case categoryAction.GET_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default categoryReducer;