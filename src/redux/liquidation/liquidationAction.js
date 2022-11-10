import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_LIQUIDATION_BEGIN   = "GET_LIQUIDATION_BEGIN"
export const GET_LIQUIDATION_SUCCESS = "GET_LIQUIDATION_SUCCESS"
export const GET_LIQUIDATION_FAILURE = "GET_LIQUIDATION_FAILURE"

export const getLiquidationBegin = (loadingLiquidation) => ({
    type: GET_LIQUIDATION_BEGIN,
    payload: { loadingLiquidation }
})

export const getLiquidationSuccess = (liquidations) => ({
    type: GET_LIQUIDATION_SUCCESS,
    payload: { liquidations }
})

export const getLiquidationFailure = (error) => ({
    type: GET_LIQUIDATION_FAILURE,
    payload: { error }
})

export function createLiquidation(liquidation) {
    const data = JSON.stringify(liquidation);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/liquidations`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => {
            dispatch(getAllLiquidations());
            dispatch(getLiquidationBegin(true));
            return {
                'statut':true,
                'ref':data.refLiq
            };
        })
        .catch((error) => { 
            dispatch(getLiquidationFailure(error))
            return false;
        });
    }
}

export function getAllLiquidations() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        let url = null;
        if (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur général") {
            url = 'liquidations';
        }else if (methods.dataUser().nomProfilAgent.toLowerCase() == "administrateur") {
            url = 'liquidations/regie/'+methods.dataUser().idRegie;
        }else {
            url = 'liquidations/structure/'+methods.dataUser().idStructure;
        }
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/${url}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getLiquidationBegin(true))
            dispatch(getLiquidationSuccess(data))
            return true;
        })
        .catch((error) => { 
            dispatch(getLiquidationFailure(error))
            return false;
        });
    }
    
}

export function updateLiquidation(id,structure) {
    const data = JSON.stringify(structure);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/liquidations/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllLiquidations());
            dispatch(getLiquidationBegin(true));
            return true; 
        })
        .catch((error) => { 
            dispatch(getLiquidationFailure(error))
            return false;
        });
    }
}

export function deleteLiquidation(id) {
    const requestOptions = {
        method: 'DELETE'
    }; 
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/liquidations/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getAllLiquidations());
            dispatch(getLiquidationBegin(true));
            return true;
        })
        .catch((error) => { 
            dispatch(getLiquidationFailure(error))
            return false;
        });
    }
}