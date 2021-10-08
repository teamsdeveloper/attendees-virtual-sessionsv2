import { JOINED_IN_SESSION_ACTION, LEFT_FROM_SESSION, LOGIN_ACTION, LOGOUT_ACTION, STORE_LIVESESSIONS_ACTION, STORE_SESSIONS_ACTION, STORE_SPEAKERS_ACTION, STORE_SPONSORS_ACTION } from "./Actions";


function reducer(state, action){
    console.log("STORE_SPEAKERS_ACTION", action)
    switch(action.type){
        case STORE_SPEAKERS_ACTION: {
            
            return {
                ...state,
                speakers: [...action.payload],
                isSpeakersFetched: true
            }
            break;
        }
        case STORE_SESSIONS_ACTION: {
            
            return {
                ...state,
                sessions: [...action.payload]                
            }
            break;
        }
        case STORE_LIVESESSIONS_ACTION: {
            
            return {
                ...state,
                liveSessions: [...action.payload]                
            }
            break;
        }
        case STORE_SPONSORS_ACTION: {
            
            return {
                ...state,
                sponsors: [...action.payload]                
            }
            break;
        }

        case LOGIN_ACTION:{
            return {
                ...state,
                user: action.payload
            }
            break;
        }
        case LOGOUT_ACTION:{
            return {
                ...state,
                user: null
            }
            break;
        }

        case JOINED_IN_SESSION_ACTION: {
            return {
                ...state,
                isInSession: true
            }
            break;
        }
        case LEFT_FROM_SESSION: {
            return {
                ...state,
                isInSession: false
            }
            return;
        }

    }
    return state;
}

export default reducer;