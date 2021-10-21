import { useEffect, useState } from "react";
import { useContext } from "react";
import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import Speakers from "../Components/Speakers";
import SpeakersData from "../Data/SpeakersData";
import { getSpeakers } from "../Services/ApiService";
import { STORE_SPEAKERS_ACTION } from "../Store/Actions";
import AppContext from "../Store/AppContext";


function SpeakersPage(){
    const [speakers, setSpeakers] = useState([]);
    useEffect(async ()=>{
      (async function () {
          let res = await getSpeakers();
          setSpeakers(res);
      })();
    },[])
    return (<>
            <Banner page={"Speakers"}/>
            {speakers.length > 0 &&<Speakers speakers={speakers} styles={{paddingTop: "59px", paddingBottom: "5px"}}/>}
    </>)
}

export default withFooter(SpeakersPage);