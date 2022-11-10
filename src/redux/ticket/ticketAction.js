import methods from '../../constant';
import { Pn2Request } from '../../constant/pn2_request'

export const GET_TICKET_BEGIN   = "GET_TICKET_BEGIN"
export const GET_TICKET_SUCCESS = "GET_TICKET_SUCCESS"
export const GET_TICKET_FAILURE = "GET_TICKET_FAILURE"

export const getTicketBegin = (loadingTicket) => ({
    type: GET_TICKET_BEGIN,
    payload: { loadingTicket }
})

export const getTicketSuccess = (tickets) => ({
    type: GET_TICKET_SUCCESS,
    payload: { tickets }
})

export const getTicketFailure = (error) => ({
    type: GET_TICKET_FAILURE,
    payload: { error }
})

export function createTicket(ticket) {
    const data = JSON.stringify(ticket);
    const requestOptions = {
        method: 'POST',
        body: data
    };

    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/guichet`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getTicketBegin(true))
            dispatch(getAllTickets())
            return true
        })
        .catch((error) => { 
            dispatch(getTicketFailure(error))
            return false;
        });
    }
}

export function getAllTickets() {
    const requestOptions = {
        method: 'GET',
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/guichet/`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getTicketBegin(true))
            dispatch(getTicketSuccess(data))
        })
        .catch((error) => { 
            dispatch(getTicketFailure(error))
            return false;
        });
    }
    
}

export function updateTicket(id,ticket) {
    const data = JSON.stringify(ticket);
    const requestOptions = {
        method: 'PUT',
        body: data
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/guichet/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getTicketBegin(true))
            dispatch(getAllTickets())
            return true
        })
        .catch((error) => { 
            dispatch(getTicketFailure(error))
            return false;
        });
    }
}

export function deleteTicket(id) {
    const requestOptions = {
        method: 'DELETE'
    };
    return dispatch => {
        return Pn2Request.fetch(`${process.env.REACT_APP_API_URL}api/v1/guichet/${id}`, requestOptions)
        .then(response => {
            if (response.ok) {
                return JSON.parse(response.body);
            }
            throw new Error(response.error);
        })
        .then(data => { 
            dispatch(getTicketBegin(true))
            dispatch(getAllTickets())
            return true
        })
        .catch((error) => { 
            dispatch(getTicketFailure(error))
            return false;
        });
    }
}