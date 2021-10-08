import Speakers from "../Speakers";

function TopSpeakers({speakers}){
    return(<section>
        <div id="lgx-speakers" className="lgx-speakers">
            <div className="lgx-inner" style={{paddingTop: "5px", paddingBottom: "5px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="lgx-heading-area" style={{marginBottom: "1px"}}>
                                <h2 className="lgx-heading">
                                    <span className="back-heading"><i className="fa fa-microphone" aria-hidden="true"></i></span>
                                    <span className="heading">Top Speakers</span>
                                </h2>
                                
                            </div>
                        </div>
                    </div>
                    <Speakers speakers={speakers} styles={{paddingTop: "0px", paddingBottom: "5px"}}/>
               </div>
            </div>
        </div>
        </section>  )
}

export default TopSpeakers;