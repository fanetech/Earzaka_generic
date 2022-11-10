import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_DEMANDEEVALUATION_BEGIN   = "GET_DEMANDEEVALUATION_BEGIN"
export const GET_DEMANDEEVALUATION_SUCCESS = "GET_DEMANDEEVALUATION_SUCCESS"
export const GET_DEMANDEEVALUATION_FAILURE = "GET_DEMANDEEVALUATION_FAILURE"

export const getDemandeevaluationBegin = (loadingDemandeevaluation) => ({
    type: GET_DEMANDEEVALUATION_BEGIN,
    payload: { loadingDemandeevaluation }
})

export const getDemandeevaluationSuccess = (demandeevaluations) => ({
    type: GET_DEMANDEEVALUATION_SUCCESS,
    payload: { demandeevaluations }
})

export const getDemandeevaluationFailure = (error) => ({
    type: GET_DEMANDEEVALUATION_FAILURE,
    payload: { error }
})

export function getAllDemandedemandeevaluations() {
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
            dispatch(getDemandeevaluationBegin(true))
            dispatch(getDemandeevaluationSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getDemandeevaluationFailure(error))
            return false;
        });
    }
    
}
