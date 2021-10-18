import Speakers from "../Components/Speakers";



import LiveSessions from "../Components/Home/LiveSessions";
import TopSpeakers from "../Components/Home/TopSpeakers";
import HomeSlide from "../Components/Home/HomeSlide";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Store/AppContext";
import AppConfig from "../Config/AppConfig";
import { GetLiveSessions, getSpeakers } from "../Services/ApiService";
import { STORE_LIVESESSIONS_ACTION, STORE_SPEAKERS_ACTION } from "../Store/Actions";
import withFooter from "../Components/Hoc/withFooter";


function HomePage(){
   const {state, dispatch} = useContext(AppContext);  
   const [topSpeakers, setTopSpeakers] = useState([]);
   
   const [loading, setLoading] = useState(false);
   useEffect( async()=>{
    if(state.speakers.length == 0 && state.isSpeakersFetched === false){
        let speakers =await getSpeakers()    
        dispatch({
            type: STORE_SPEAKERS_ACTION,
            payload:speakers
        })    
    }
    
    if(state.liveSessions.length == 0){
        let sessions =await GetLiveSessions()
        dispatch({
            type: STORE_LIVESESSIONS_ACTION,
            payload:sessions
        })
    }
    
    
   },[])

   useEffect(()=>{
    let {speakers} = state;     

     speakers = speakers.sort((a, b)=> b.rate - a.rate);
     if(speakers.length > 0 && speakers.length <5){
        setTopSpeakers(speakers);
     }
     if(speakers.length >= 5){
         let temp = speakers.slice(0, 4);
         setTopSpeakers(temp);
     }
   }, [state.speakers])
   
   
   
    document.body.classList.remove("page");
    document.body.classList.remove("page-template");
    document.body.classList.add("home");    
    
    const {liveSessions} = state;
    console.log("top speakers", topSpeakers);
    return(<>
            <HomeSlide/>
            
           {liveSessions.length > 0 && <LiveSessions sessions={liveSessions}/>}
            {topSpeakers.length > 0 && <TopSpeakers speakers={topSpeakers}/>}
            
        </>    
    );
}

export default withFooter(HomePage);