import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_PROFILE_BEGIN   = "GET_PROFILE_BEGIN";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";


export const getProfileBegin = (loadingProfile) => ({
    type: GET_PROFILE_BEGIN,
    payload: { loadingProfile }
})

export const getProfileSuccess = (profiles) => ({
    type: GET_PROFILE_SUCCESS,
    payload: { profiles }
})

export const getProfileFailure = (error) => ({
    type: GET_PROFILE_FAILURE,
    payload: { error }
})

export function createProfile(profile) {
    const data = JSON.stringify(profile);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/profil-web`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllProfiles())
            dispatch(getProfileBegin(true))
            return true;
        })
        .catch((error) => { 
            dispatch(getProfileFailure(error))
            return false;
        });
    }
}

export function getAllProfiles() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/profil-web`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getProfileSuccess(data))
            dispatch(getProfileBegin(true))
        })
        .catch((error) => { 
            dispatch(getProfileFailure(error))
            return false;
        });
    }
    
}

export function updateProfile(id,profile) {
    const data = JSON.stringify(profile);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/profil-web/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllProfiles())
            dispatch(getProfileBegin(true))
            return true
        })
        .catch((error) => { 
            dispatch(getProfileFailure(error))
            return false;
        });
    }
}

export function deleteProfile(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/profil-web/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllProfiles());
            dispatch(getProfileBegin(true));
            return true
        })
        .catch((error) => { 
            dispatch(getProfileFailure(error))
            return false;
        });
    }
}