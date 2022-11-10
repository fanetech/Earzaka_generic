import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_AUTH_BEGIN   = "GET_AUTH_BEGIN"
export const GET_AUTH_SUCCESS = "GET_AUTH_SUCCESS"
export const GET_AUTH_FAILURE = "GET_AUTH_FAILURE"

export const getAuthBegin = (loadingAuth) => ({
    type: GET_AUTH_BEGIN,
    payload: { loadingAuth }
})

export const getAuthSuccess = (auth) => ({
    type: GET_AUTH_SUCCESS,
    payload: { auth }
})

export const getAuthFailure = (error) => ({
    type: GET_AUTH_FAILURE,
    payload: { error }
})

export function singIn(auth) {
    const data = JSON.stringify(auth);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/auth/signin`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            methods.setLocalStorage("user",methods.encryptionUser(JSON.stringify(data)),43200001)
            dispatch(getAuthBegin(true));
            dispatch(getAuthSuccess(data));
            return true;
        })
        .catch((error) => { 
            console.log(error);
            dispatch(getAuthFailure(error))
            return false;
        });
    }
}
