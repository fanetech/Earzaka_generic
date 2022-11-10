import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_MEANSOFPAYMENT_BEGIN   = "GET_MEANSOFPAYMENT_BEGIN"
export const GET_MEANSOFPAYMENT_SUCCESS = "GET_MEANSOFPAYMENT_SUCCESS"
export const GET_MEANSOFPAYMENT_FAILURE = "GET_MEANSOFPAYMENT_FAILURE"

export const getMeansofpaymentBegin = (loadingMeansofpayment) => ({
    type: GET_MEANSOFPAYMENT_BEGIN,
    payload: { loadingMeansofpayment }
})

export const getMeansofpaymentSuccess = (meansofpayments) => ({
    type: GET_MEANSOFPAYMENT_SUCCESS,
    payload: { meansofpayments }
})

export const getMeansofpaymentFailure = (error) => ({
    type: GET_MEANSOFPAYMENT_FAILURE,
    payload: { error }
})

export function createMeansofpayment(meansofpayment) {
    const data = JSON.stringify(meansofpayment);
    const requestOptions = {
        method: 'POST',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/moyen-payement`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllMeansofpayments())
            dispatch(getMeansofpaymentBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getMeansofpaymentFailure(error))
            return false;
        });
    }
}

export function getAllMeansofpayments() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/moyen-payement`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getMeansofpaymentBegin(true))
            dispatch(getMeansofpaymentSuccess(data))
        })
        .catch((error) => { 
            dispatch(getMeansofpaymentFailure(error))
            return false;
        });
    }
    
}

export function updateMeansofpayment(id,profile) {
    const data = JSON.stringify(profile);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/moyen-payement/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllMeansofpayments())
            dispatch(getMeansofpaymentBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getMeansofpaymentFailure(error))
            return false;
        });
    }
}

export function deleteMeansofpayment(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/moyen-payement/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllMeansofpayments())
            dispatch(getMeansofpaymentBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getMeansofpaymentFailure(error))
            return false;
        });
    }
}