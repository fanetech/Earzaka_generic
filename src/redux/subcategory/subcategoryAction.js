import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_SUBCATEGORY_BEGIN   = "GET_SUBCATEGORY_BEGIN"
export const GET_SUBCATEGORY_SUCCESS = "GET_SUBCATEGORY_SUCCESS"
export const GET_SUBCATEGORY_FAILURE = "GET_SUBCATEGORY_FAILURE"

export const getSubcategoryBegin = (loadingSubcategory) => ({
    type: GET_SUBCATEGORY_BEGIN,
    payload: { loadingSubcategory }
})

export const getSubcategorySuccess = (subcategories) => ({
    type: GET_SUBCATEGORY_SUCCESS,
    payload: { subcategories }
})

export const getSubcategoryFailure = (error) => ({
    type: GET_SUBCATEGORY_FAILURE,
    payload: { error }
})

export function createSubcategory(subcategory) {
    const data = JSON.stringify(subcategory);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/sous-categories`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllSubcategorys());
            dispatch(getSubcategoryBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getSubcategoryFailure(error))
            return false;
        });
    }
}

export function getAllSubcategorys() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = 'sous-categories';
        if (methods.dataUser().nomProfilAgent.toLowerCase() != "administrateur général") {
            url = 'sous-categories/regie/'+methods.dataUser().idRegie;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getSubcategoryBegin(true))
            dispatch(getSubcategorySuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getSubcategoryFailure(error))
            return false;
        });
    }
    
}

export function updateSubcategory(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/sous-categories/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllSubcategorys());
            dispatch(getSubcategoryBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getSubcategoryFailure(error))
            return false;
        });
    }
}

export function deleteSubcategory(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/sous-categories/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllSubcategorys());
            dispatch(getSubcategoryBegin(true));
            return true;
        })
        .catch((error) => {
            dispatch(getSubcategoryFailure(error))
            return false;
        });
    }
}