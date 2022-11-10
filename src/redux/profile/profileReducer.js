import * as profileActions from "./profileAction";

const initialState = {
    loadingProfile: false,
    profiles: {},
    error: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActions.GET_PROFILE_BEGIN:
            return {
                ...state,
                loadingProfile: action.payload.loadingProfile
            }
        case profileActions.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profiles: action.payload.profiles
            }
        case profileActions.GET_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default profileReducer;