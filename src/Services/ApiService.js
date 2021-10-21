import AppConfig from "../Config/AppConfig";

async function getSpeakers () {    
    let response = await fetch(`${AppConfig.baseWebApiUrl}/speakers`);
    let data = await response.json();
    return data;    
}

async function GetSessionsByDate(date){
    let response = await fetch(`${AppConfig.baseWebApiUrl}/sessions/getbydate/${date}`);
    let data = await response.json();
    return data;
}
async function GetSessionsBySpeaker(name){
    let response = await fetch(`${AppConfig.baseWebApiUrl}/sessions/getbyspeaker/${name}`);
    let data = await response.json();
    return data;
}

async function GetLiveSessions(date){
    let response = await fetch(`${AppConfig.baseWebApiUrl}/sessions/GetByLive/${date}`);
    let data = await response.json();
    return data;
}

async function GetSponsors(){
    let response = await fetch(`${AppConfig.baseWebApiUrl}/sponsors`);
    let data = await response.json();
    return data;
}
async function GetSessionById(id) {
    let response = await fetch(`${AppConfig.baseWebApiUrl}/sessions/getbyid/${id}`);
    if(response.status !== 200)
        return null;
    let data = await response.json();
    return data;
}
export {
    getSpeakers,
    GetSessionsByDate,
    GetSessionsBySpeaker,
    GetLiveSessions,
    GetSponsors,
    GetSessionById
}