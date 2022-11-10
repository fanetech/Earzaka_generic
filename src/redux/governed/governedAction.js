import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_GOVERNED_BEGIN   = "GET_GOVERNED_BEGIN"
export const GET_GOVERNED_SUCCESS = "GET_GOVERNED_SUCCESS"
export const GET_GOVERNED_FAILURE = "GET_GOVERNED_FAILURE"

export const getGovernedBegin = (loadingGoverned) => ({
    type: GET_GOVERNED_BEGIN,
    payload: { loadingGoverned }
})

export const getGovernedSuccess = (governeds) => ({
    type: GET_GOVERNED_SUCCESS,
    payload: { governeds }
})

export const getGovernedFailure = (error) => ({
    type: GET_GOVERNED_FAILURE,
    payload: { error }
})

export function createGoverned(governed) {
    const data = JSON.stringify(governed);
    const requestOptions = {
        method: 'POST',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/regies`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllGoverneds())
            dispatch(getGovernedBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getGovernedFailure(error))
            return false;
        });
    }
}

export function getAllGoverneds() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/regies`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getGovernedBegin(true))
            dispatch(getGovernedSuccess(data))
        })
        .catch((error) => { 
            dispatch(getGovernedFailure(error))
            return false;
        });
    }
    
}

export function updateGoverned(id,profile) {
    const data = JSON.stringify(profile);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/regies/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllGoverneds())
            dispatch(getGovernedBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getGovernedFailure(error))
            return false;
        });
    }
}

export function deleteGoverned(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/regies/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllGoverneds())
            dispatch(getGovernedBegin(true));
            return true;
        })
        .catch((error) => {
            dispatch(getGovernedFailure(error))
            return false;
        });
    }
}