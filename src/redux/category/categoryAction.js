import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_CATEGORY_BEGIN   = "GET_CATEGORY_BEGIN"
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS"
export const GET_CATEGORY_FAILURE = "GET_CATEGORY_FAILURE"

export const getCategoryBegin = (loadingCategory) => ({
    type: GET_CATEGORY_BEGIN,
    payload: { loadingCategory }
})

export const getCategorySuccess = (categories) => ({
    type: GET_CATEGORY_SUCCESS,
    payload: { categories }
})

export const getCategoryFailure = (error) => ({
    type: GET_CATEGORY_FAILURE,
    payload: { error }
})

export function createCategory(category) {
    const data = JSON.stringify(category);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/categorie-services`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllCategorys());
            dispatch(getCategoryBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getCategoryFailure(error))
            return false;
        });
    }
}

export function getAllCategorys() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = 'categorie-services';
        if (methods.dataUser().nomProfilAgent.toLowerCase() != "administrateur général") {
            url = 'categorie-services/regie/'+methods.dataUser().idRegie;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getCategoryBegin(true))
            dispatch(getCategorySuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getCategoryFailure(error))
            return false;
        });
    }
    
}

export function updateCategory(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/categorie-services/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllCategorys());
            dispatch(getCategoryBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getCategoryFailure(error))
            return false;
        });
    }
}

export function deleteCategory(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/categorie-services/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllCategorys());
            dispatch(getCategoryBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getCategoryFailure(error))
            return false;
        });
    }
}