function StoreState(state) {
    
    localStorage.removeItem("state");
    localStorage.setItem("state", JSON.stringify(state));
}

function GetState() {
    let state = localStorage.getItem("state");
    
    if(!state)
        return {
            speakers: [],
            sessions: [] ,
            liveSessions: [],
            isSpeakersFetched: false,
            user: null,
            sponsors: [],
            isInSession: false,
            joinSession: null
        }
    else
        return JSON.parse(state);
}


export {
    GetState,
    StoreState
}