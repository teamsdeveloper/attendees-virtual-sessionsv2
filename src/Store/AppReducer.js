import { StoreState } from "../Services/LocalStorageService";
import { JOINED_IN_SESSION_ACTION, JOIN_SESSION_ACTION, LEFT_FROM_SESSION, LOGIN_ACTION, LOGOUT_ACTION, STORE_LIVESESSIONS_ACTION, STORE_SESSIONS_ACTION, STORE_SPEAKERS_ACTION, STORE_SPONSORS_ACTION } from "./Actions";


function reducer(state, action){
    console.log("Action", action)
    let updateState = state;
    switch(action.type){
        case STORE_SPEAKERS_ACTION: {            
            updateState = {
                ...updateState,
                speakers: [...action.payload],
                isSpeakersFetched: true
            } ;
            break;           
        }
        case STORE_SESSIONS_ACTION: {
            
            updateState = {
                ...updateState,
                sessions: [...action.payload]                
            }
            break;
        }
        case STORE_LIVESESSIONS_ACTION: {
            
            updateState = {
                ...updateState,
                liveSessions: [...action.payload]                
            };
            break;
            
        }
        case STORE_SPONSORS_ACTION: {
            
            updateState = {
                ...updateState,
                sponsors: [...action.payload]                
            }
            break;
        }
        case LOGIN_ACTION:{

            updateState = {
                ...updateState,
                user: action.payload
            }
            break;
        }
        case LOGOUT_ACTION:{
            updateState = {
                ...updateState,
                user: null,
                isInSession: false,
                joinSession: null
            }
            break;
        }

        case JOINED_IN_SESSION_ACTION: {
            updateState = {
                ...updateState,
                isInSession: true,
            }
            break;
        }
        case JOIN_SESSION_ACTION: {
            updateState = {
                ...updateState,
                joinSession: action.payload
            }
            break;
        }
        case LEFT_FROM_SESSION: {
            updateState = {
                ...updateState,
                isInSession: false,
                joinSession: null
            }
            break;
        }
        default:

        break;

    }
    StoreState(updateState);
    console.log("updated state", updateState);
    return updateState;
}

export default reducer;