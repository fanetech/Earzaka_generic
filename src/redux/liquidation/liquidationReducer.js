import * as liquidationAction from "./liquidationAction";

const initialState = {
    loadingLiquidation: false,
    liquidations: {},
    error: null
}

const liquidationReducer = (state = initialState, action) => {
    switch (action.type) {
        case liquidationAction.GET_LIQUIDATION_BEGIN:
            return {
                ...state,
                loadingLiquidation: action.payload.loadingLiquidation
            }
        case liquidationAction.GET_LIQUIDATION_SUCCESS:
            return {
                ...state,
                liquidations: action.payload.liquidations
            }
        case liquidationAction.GET_LIQUIDATION_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default liquidationReducer;