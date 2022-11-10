import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_TRANSACTIONOFTYPE_BEGIN   = "GET_TRANSACTIONOFTYPE_BEGIN"
export const GET_TRANSACTIONOFTYPE_SUCCESS = "GET_TRANSACTIONOFTYPE_SUCCESS"
export const GET_TRANSACTIONOFTYPE_FAILURE = "GET_TRANSACTIONOFTYPE_FAILURE"

export const getTransactionoftypeBegin = (loadingTransactionoftype) => ({
    type: GET_TRANSACTIONOFTYPE_BEGIN,
    payload: { loadingTransactionoftype }
})

export const getTransactionoftypeSuccess = (transactionoftypes) => ({
    type: GET_TRANSACTIONOFTYPE_SUCCESS,
    payload: { transactionoftypes }
})

export const getTransactionoftypeFailure = (error) => ({
    type: GET_TRANSACTIONOFTYPE_FAILURE,
    payload: { error }
})

export function createTransactionoftype(transactionoftype) {
    const data = JSON.stringify(transactionoftype);
    const requestOptions = {
        method: 'POST',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/transaction-type`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllTransactionoftypes())
            dispatch(getTransactionoftypeBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getTransactionoftypeFailure(error))
            return false;
        });
    }
}

export function getAllTransactionoftypes() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/transaction-type`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getTransactionoftypeBegin(true))
            dispatch(getTransactionoftypeSuccess(data))
        })
        .catch((error) => { 
            dispatch(getTransactionoftypeFailure(error))
            return false;
        });
    }
    
}

export function updateTransactionoftype(id,profile) {
    const data = JSON.stringify(profile);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/transaction-type/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllTransactionoftypes())
            dispatch(getTransactionoftypeBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getTransactionoftypeFailure(error))
            return false;
        });
    }
}

export function deleteTransactionoftype(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/transaction-type/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllTransactionoftypes())
            dispatch(getTransactionoftypeBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getTransactionoftypeFailure(error))
            return false;
        });
    }
}