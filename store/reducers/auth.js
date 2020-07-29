import { LOGIN, SIGNUP, AUTHENTICATE } from "../actions/auth";

const initialState = {
    token:null,
    userId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('looogujem')
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
        default:
            return state
    }
}