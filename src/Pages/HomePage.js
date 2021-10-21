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
   const [liveSessions, setLiveSessions] = useState([]);

    const getCurrentData=()=>{
        let date = new Date();
        let day =  date.toLocaleDateString("en-US", { day: 'numeric' })
            if(day.length === 1)
                day = `0${day}`;
            
        let lyear = date.toLocaleDateString("en-US", { year: 'numeric' });
        let nmonth = date.toLocaleDateString("en-US", { month: 'numeric' });
        return `${nmonth}-${day}-${lyear}`
    }

   useEffect(()=>{
    console.log("date", getCurrentData());

    (async function () {
        let date = getCurrentData();
        let sessions =await GetLiveSessions(date)
        setLiveSessions(sessions);
        console.log("liveSessions", liveSessions);
    })();

    (async function () {
      let speakers = await await getSpeakers()
      if(speakers.length ===0)
            return;
    
        let temp = speakers.slice(0, 4);
      setTopSpeakers(temp);
    })();

   }, [])
   
   
   
   
   
    document.body.classList.remove("page");
    document.body.classList.remove("page-template");
    document.body.classList.add("home");    
    
    
    console.log("top speakers", topSpeakers);
    return(<>
            <HomeSlide/>
            
           {liveSessions.length > 0 && <LiveSessions sessions={liveSessions}/>}
            {topSpeakers.length > 0 && <TopSpeakers speakers={topSpeakers}/>}
            
        </>    
    );
}

export default withFooter(HomePage);