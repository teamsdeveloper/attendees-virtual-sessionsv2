import { useContext, useEffect, useState } from "react";
import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import NoDataMessage from "../Components/NoDataMessage";
import Days from "../Components/Session/Days";
import SessionItem from "../Components/Session/SessionItem";
import Spinner from "../Components/Spinner";
import { GetSessionsByDate } from "../Services/ApiService";
import { STORE_SESSIONS_ACTION } from "../Store/Actions";
import AppContext from "../Store/AppContext";
import SessionsData from "./../Data/SessionsData";

function SessionsPage() {
    
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState([]);
    const generateTabs=()=>{
        let date = new Date();       
        let tabs = [];
        for(let x = 0; x < 4; x++){
            date.setDate(date.getDate() + (x ==0 ? 0 : 1));
            let day =  date.toLocaleDateString("en-US", { day: 'numeric' })
            if(day.length === 1)
                day = `0${day}`;
            let lmonth = date.toLocaleDateString("en-US", { month: 'long' });
            let lyear = date.toLocaleDateString("en-US", { year: 'numeric' });
            let nmonth = date.toLocaleDateString("en-US", { month: 'numeric' });
            if(nmonth.length === 1)
                nmonth = `0${nmonth}`;

            let data = {
                header:x + 1,
                uiDate: `${lmonth}, ${lyear}`,
                apiDate: `${nmonth}-${day}-${lyear}`,
                day: day 

            }
            tabs.push(data);
            
        }
        setActiveTab(tabs[0])
        setTabs(tabs);
    }

    useEffect(async()=>{    
        setLoading(true) 
        generateTabs();        
        
    },[])
    useEffect(async()=>{
        await fetchSessionsFromApi();
    },[activeTab])
    const fetchSessionsFromApi=async()=>{
        if(activeTab !== null){
           let res = await GetSessionsByDate(activeTab.apiDate)
           console.log("res", res);
           setSessions(res)
           setLoading(false)
        }
    }
    const onTabClickHandler=async(tab)=>{
        console.log("active tab", tab);
        setLoading(true) 
        setActiveTab(tab);
        
    }
    const renderNoMessage=()=>{        
        

        if(loading || sessions.length > 0){
            return null;
        }
        return <NoDataMessage message={`No session on this date`}/>
     }
    document.body.classList.remove("home"); 
    document.body.classList.add("page");
    document.body.classList.add("page-template");
       
    return (<>
        <Banner page={"Sessions"} />
        <section>
            <div id="lgx-schedule" className="lgx-schedule">
                <div className="lgx-inner" style={{paddingTop: "59px", paddingBottom: "5px"}}>
                    <div className="container">
                        
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="lgx-tab">
                                    <Days tabs={tabs} onTabClick={onTabClickHandler} active={activeTab}/>
                                    <div class="tab-content lgx-tab-content text-center">
                                        <div id="home" class="tab-pane fade in active">
                                             {loading === false && sessions.length > 0 ? sessions.map((session, index)=><SessionItem key={index} {...session} live={false}/>): <>
                                                {loading === true && <Spinner/>}
                                                
                                             </>} 
                                            {renderNoMessage()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default withFooter(SessionsPage);