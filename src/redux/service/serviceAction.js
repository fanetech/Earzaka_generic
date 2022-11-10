import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_SERVICE_BEGIN   = "GET_SERVICE_BEGIN"
export const GET_SERVICE_SUCCESS = "GET_SERVICE_SUCCESS"
export const GET_SERVICE_FAILURE = "GET_SERVICE_FAILURE"

export const getServiceBegin = (loadingService) => ({
    type: GET_SERVICE_BEGIN,
    payload: { loadingService }
})

export const getServiceSuccess = (services) => ({
    type: GET_SERVICE_SUCCESS,
    payload: { services }
})

export const getServiceFailure = (error) => ({
    type: GET_SERVICE_FAILURE,
    payload: { error }
})

export function createService(service) {
    const data = JSON.stringify(service);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/services`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllServices());
            dispatch(getServiceBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getServiceFailure(error))
            return false;
        });
    }
}

export function getAllServices() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = 'services';
        if (methods.dataUser().nomProfilAgent.toLowerCase() != "administrateur général") {
            url = 'services/regie/'+methods.dataUser().idRegie;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getServiceBegin(true))
            dispatch(getServiceSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getServiceFailure(error))
            return false;
        });
    }
    
}

export function updateService(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/services/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllServices());
            dispatch(getServiceBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getServiceFailure(error))
            return false;
        });
    }
}

export function deleteService(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/services/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllServices());
            dispatch(getServiceBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getServiceFailure(error))
            return false;
        });
    }
}