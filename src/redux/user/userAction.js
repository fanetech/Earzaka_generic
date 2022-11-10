import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_USER_BEGIN   = "GET_USER_BEGIN"
export const GET_USER_SUCCESS = "GET_USER_SUCCESS"
export const GET_USER_FAILURE = "GET_USER_FAILURE"

export const getUserBegin = (loadingUser) => ({
    type: GET_USER_BEGIN,
    payload: { loadingUser }
})

export const getUserSuccess = (users) => ({
    type: GET_USER_SUCCESS,
    payload: { users }
})

export const getUserFailure = (error) => ({
    type: GET_USER_FAILURE,
    payload: { error }
})

export function createUser(user) {
    const data = JSON.stringify(user);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/agents`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllUsers());
            dispatch(getUserBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getUserFailure(error))
            return false;
        });
    }
}

export function getAllUsers() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/agents`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getUserBegin(true))
            dispatch(getUserSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getUserFailure(error))
            return false;
        });
    }
    
}

export function updateUser(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/agents/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllUsers());
            dispatch(getUserBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getUserFailure(error))
            return false;
        });
    }
}

export function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/agents/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllUsers());
            dispatch(getUserBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getUserFailure(error))
            return false;
        });
    }
}