import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_POINTOFSERVICE_BEGIN   = "GET_POINTOFSERVICE_BEGIN"
export const GET_POINTOFSERVICE_SUCCESS = "GET_POINTOFSERVICE_SUCCESS"
export const GET_POINTOFSERVICE_FAILURE = "GET_POINTOFSERVICE_FAILURE"

export const getPointofserviceBegin = (loadingPointofservice) => ({
    type: GET_POINTOFSERVICE_BEGIN,
    payload: { loadingPointofservice }
})

export const getPointofserviceSuccess = (pointofservices) => ({
    type: GET_POINTOFSERVICE_SUCCESS,
    payload: { pointofservices }
})

export const getPointofserviceFailure = (error) => ({
    type: GET_POINTOFSERVICE_FAILURE,
    payload: { error }
})

export function createPointofservice(pointofservice) {
    const data = JSON.stringify(pointofservice);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/point`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllPointofservices());
            dispatch(getPointofserviceBegin(true));
            return true;
        })
        .catch((error) => {
            dispatch(getPointofserviceFailure(error))
            return false;
        });
    }
}

export function getAllPointofservices() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/point`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getPointofserviceBegin(true))
            dispatch(getPointofserviceSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getPointofserviceFailure(error))
            return false;
        });
    }
    
}

export function updatePointofservice(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/point/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllPointofservices());
            dispatch(getPointofserviceBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getPointofserviceFailure(error))
            return false;
        });
    }
}

export function deletePointofservice(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/point/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllPointofservices());
            dispatch(getPointofserviceBegin(true));
            return true;
        })
        .catch((error) => {
            dispatch(getPointofserviceFailure(error))
            return false;
        });
    }
}