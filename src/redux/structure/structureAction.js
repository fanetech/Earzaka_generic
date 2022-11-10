import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_STRUCTURE_BEGIN   = "GET_STRUCTURE_BEGIN"
export const GET_STRUCTURE_SUCCESS = "GET_STRUCTURE_SUCCESS"
export const GET_STRUCTURE_FAILURE = "GET_STRUCTURE_FAILURE"

export const getStructureBegin = (loadingStructure) => ({
    type: GET_STRUCTURE_BEGIN,
    payload: { loadingStructure }
})

export const getStructureSuccess = (structures) => ({
    type: GET_STRUCTURE_SUCCESS,
    payload: { structures }
})

export const getStructureFailure = (error) => ({
    type: GET_STRUCTURE_FAILURE,
    payload: { error }
})

export function createStructure(structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/structures`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getStructureBegin(true))
            dispatch(getAllStructures())
            return true
        })
        .catch((error) => { 
            dispatch(getStructureFailure(error))
            return false;
        });
    }
}

export function getAllStructures() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/structures`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getStructureBegin(true))
            dispatch(getStructureSuccess(data))
        })
        .catch((error) => { 
            dispatch(getStructureFailure(error))
            return false;
        });
    }
    
}

export function updateStructure(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/structures/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getStructureBegin(true))
            dispatch(getAllStructures())
            return true
        })
        .catch((error) => { 
            dispatch(getStructureFailure(error))
            return false;
        });
    }
}

export function deleteStructure(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/structures/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getStructureBegin(true))
            dispatch(getAllStructures())
            return true
        })
        .catch((error) => { 
            dispatch(getStructureFailure(error))
            return false;
        });
    }
}