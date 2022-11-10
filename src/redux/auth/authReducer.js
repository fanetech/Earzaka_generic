import * as authAction from "./authAction";

const initialState = {
    loadingAuth: false,
    auth: {},
    error: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authAction.GET_AUTH_BEGIN:
            return {
                ...state,
                loadingAuth: action.payload.loadingAuth
            }
        case authAction.GET_AUTH_SUCCESS:
            return {
                ...state,
                auth: action.payload.auth
            }
        case authAction.GET_AUTH_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default authReducer;