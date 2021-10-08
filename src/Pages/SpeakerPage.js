import { useEffect, useState } from "react";
import { useContext } from "react";
import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import SessionItem from "../Components/Session/SessionItem";
import SpeakersData from "../Data/SpeakersData";
import { GetSessionsBySpeaker } from "../Services/ApiService";
import AppContext from "../Store/AppContext";



function SpeakerPage(props) {
    const [speaker, setSpeaker] = useState(null)
    const { state, dispatch } = useContext(AppContext);
    const [sessions, setSessions] = useState([])
    useEffect(async () => {
        let index = state.speakers.map((speaker) => speaker.id).indexOf(props.match.params.id);
        console.log("index", index);
        if (index === -1) {
            props.history.push("/speakers");
            return;
        }
        setSpeaker(state.speakers[index]);
        let result = await GetSessionsBySpeaker(state.speakers[index].name);
        result = result.sort((s1, s2)=>{
            return (new Date(s1.dateAndTime)) - (new Date(s2.dateAndTime));
        });
        setSessions(result);
    }, []);

    document.body.classList.remove("home");  
    document.body.classList.add("page");
    document.body.classList.add("page-template");
    
    return (<>

        {speaker !== null && <><Banner page={"Speakers"} subPage={speaker.name} />
            <section>
                <div id="lgx-speaker-single" className="lgx-speakers lgx-speaker-single">
                    <div className="lgx-inner" style={{ paddingTop: "59px", paddingBottom: "5px" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-5 col-xs-12">
                                    <div className="lgx-single-speaker">
                                        <figure>
                                            <a className="profile-img" href="#"><img src={speaker.imageUrl} /></a>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-sm-7 col-xs-12">
                                    <div className="speakers-content">
                                        <h1 className="title">{speaker.name}</h1>
                                        <h3 className="subtitle">{speaker.role}</h3>
                                        <div className="social">
                                            <ul className="list-inline">
                                                <li><a className="sp-fb" href="#"><i className="fa fa-facebook"></i></a></li>
                                                <li><a className="sp-tw" href="#"><i className="fa fa-twitter"></i></a></li>
                                                <li><a className="sp-google" href="#"><i className="fa fa-google-plus"></i></a></li>
                                                <li><a className="sp-in" href="#"><i className="fa fa-linkedin"></i></a></li>
                                                <li><a className="sp-" href="#"><i className="fa fa-soundcloud"></i></a></li>
                                            </ul>
                                        </div>
                                        <p>{speaker.about}</p>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div id="lgx-schedule" className="lgx-schedule">
                    <div className="lgx-inner" style={{ paddingTop: "59px", paddingBottom: "5px" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="lgx-tab">
                                        {sessions.map((session, index) => <SessionItem key={index} {...session} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section></>}

    </>);
}

export default withFooter(SpeakerPage);