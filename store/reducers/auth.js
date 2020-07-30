import { LOGIN, SIGNUP, AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token:null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.payload.token,
                userId: action.payload.userId
            }
        case SIGNUP:
            return {
                token: action.payload.token,
                userId: action.payload.userId
            }

        case AUTHENTICATE:
            return {
                token: action.payload.token,
                userId: action.payload.userId
            }
        case LOGOUT:
            return {
                token:null,
                userId:null
            }
        default:
            return state
    }
}