import * as userAction from "./userAction";

const initialState = {
    loadingUser: false,
    users: {},
    error: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userAction.GET_USER_BEGIN:
            return {
                ...state,
                loadingUser: action.payload.loadingUser
            }
        case userAction.GET_USER_SUCCESS:
            return {
                ...state,
                users: action.payload.users
            }
        case userAction.GET_USER_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default userReducer;