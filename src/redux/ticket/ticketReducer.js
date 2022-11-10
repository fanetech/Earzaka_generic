import * as ticketAction from "./ticketAction";

const initialState = {
    loadingTicket: false,
    tickets: {},
    error: null
}

const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ticketAction.GET_TICKET_BEGIN:
            return {
                ...state,
                loadingTicket: action.payload.loadingTicket
            }
        case ticketAction.GET_TICKET_SUCCESS:
            return {
                ...state,
                tickets: action.payload.tickets
            }
        case ticketAction.GET_TICKET_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default ticketReducer;