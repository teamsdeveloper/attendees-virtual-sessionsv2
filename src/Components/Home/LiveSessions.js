import SessionItem from "../Session/SessionItem";

function LiveSessions({sessions}){
    return(<section>
        <div id="lgx-schedule" className="lgx-schedule">
            <div className="lgx-inner" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="lgx-heading-area" style={{marginBottom: "1px"}}>
                                <h2 className="lgx-heading">
                                    <span className="back-heading"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                                    <span className="heading">Live Sessions</span>
                                </h2>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                                <div className="col-xs-12">
                                    <div className="lgx-tab">
    
                                        <div class="tab-content lgx-tab-content text-center">
                                            <div id="home" class="tab-pane fade in active">
                                                  {sessions.map((session, index)=><SessionItem key={index} {...session} live={true}/>)}  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
    
                </div>
            </div>
        </div>
    </section>)
}
export default LiveSessions;
