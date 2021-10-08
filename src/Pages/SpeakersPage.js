import { useEffect } from "react";
import { useContext } from "react";
import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import Speakers from "../Components/Speakers";
import SpeakersData from "../Data/SpeakersData";
import { getSpeakers } from "../Services/ApiService";
import { STORE_SPEAKERS_ACTION } from "../Store/Actions";
import AppContext from "../Store/AppContext";


function SpeakersPage(){
    const {state, dispatch} = useContext(AppContext);
    useEffect(async ()=>{
        if(state.speakers.length == 0 && state.isSpeakersFetched === false){
            let speakers =await getSpeakers()    
            dispatch({
                type:  STORE_SPEAKERS_ACTION,
                payload:speakers
            })
        
        }
        
    })
    return (<>
            <Banner page={"Speakers"}/>
            {state.speakers.length > 0 &&<Speakers speakers={state.speakers} styles={{paddingTop: "59px", paddingBottom: "5px"}}/>}
    </>)
}

export default withFooter(SpeakersPage);