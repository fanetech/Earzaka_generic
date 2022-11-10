import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_EVALUATION_BEGIN   = "GET_EVALUATION_BEGIN"
export const GET_EVALUATION_SUCCESS = "GET_EVALUATION_SUCCESS"
export const GET_EVALUATION_FAILURE = "GET_EVALUATION_FAILURE"

export const getEvaluationBegin = (loadingEvaluation) => ({
    type: GET_EVALUATION_BEGIN,
    payload: { loadingEvaluation }
})

export const getEvaluationSuccess = (evaluations) => ({
    type: GET_EVALUATION_SUCCESS,
    payload: { evaluations }
})

export const getEvaluationFailure = (error) => ({
    type: GET_EVALUATION_FAILURE,
    payload: { error }
})

export function createEvaluation(evaluation) {
    const data = JSON.stringify(evaluation);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/evaluations`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllEvaluations());
            dispatch(getEvaluationBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getEvaluationFailure(error))
            return false;
        });
    }
}

export function getAllEvaluations() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = null;
        if (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général") {
            url = 'evaluations';
        }else if (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur") {
            url = 'evaluations/regie/'+methods.dataUser().idRegie;
        }else {
            url = 'evaluations/structure/'+methods.dataUser().idStructure;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getEvaluationBegin(true))
            dispatch(getEvaluationSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getEvaluationFailure(error))
            return false;
        });
    }
    
}

export function getAllDemandeEvaluations() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = 'demande-evaluations';
        if (methods.dataUser().nomProfilAgent.toLowerCase() != "administrateur général") {
            url = 'demande-evaluations/regie/'+methods.dataUser().idRegie;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getEvaluationBegin(true))
            dispatch(getEvaluationSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getEvaluationFailure(error))
            return false;
        });
    }
    
}

export function updateEvaluation(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/evaluations/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllEvaluations());
            dispatch(getEvaluationBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getEvaluationFailure(error))
            return false;
        });
    }
}

export function deleteEvaluation(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/evaluations/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllEvaluations());
            dispatch(getEvaluationBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getEvaluationFailure(error))
            return false;
        });
    }
}