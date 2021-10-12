import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import withHeader from "../Components/Hoc/withHeader";

function RegisterPage(){
    return (<>
        <Banner page={"Register"}/>
        <section>
    <div id="lgx-register" className="lgx-register">
        <div className="lgx-inner" style={{paddingTop: "59px", paddingBottom: "5px"}}>
            <div className="container">                
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="single">
                            <div className="single-top">
                                <h4 className="price">36<span>$</span></h4>
                                <h3 className="title">Initial Pass</h3>
                                <p>Attend only First day</p>
                            </div>
                            <div className="single-bottom">
                                <ul className="list-unstyled list">
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Unlimited Entrance</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Comfortable Seat</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Paid Certificate</li>
                                    <li><i className="fa fa-times" aria-hidden="true"></i> Day One Workshop</li>
                                    <li><i className="fa fa-times" aria-hidden="true"></i> One Certificate</li>
                                </ul>
                                <a className="lgx-btn" href="#"><span>Buy Ticket</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="single active">
                            <div className="single-top">
                                <h4 className="price">69<span>$</span></h4>
                                <h3 className="title">Golden Pass</h3>
                                <p>Attend only First day</p>
                            </div>
                            <div className="single-bottom">
                                <ul className="list-unstyled list">
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Unlimited Entrance</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Comfortable Seat</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Paid Certificate</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Day One Workshop</li>
                                    <li><i className="fa fa-times" aria-hidden="true"></i> One Certificate</li>
                                </ul>
                                <a className="lgx-btn" href="#"><span>Buy Ticket</span></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-4">
                        <div className="single">
                            <div className="single-top">
                                <h4 className="price">98<span>$</span></h4>
                                <h3 className="title">Dimond Pass</h3>
                                <p>Attend only First day</p>
                            </div>
                            <div className="single-bottom">
                                <ul className="list-unstyled list">
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Unlimited Entrance</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Comfortable Seat</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Paid Certificate</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Day One Workshop</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> One Certificate</li>
                                </ul>
                                <a className="lgx-btn" href="#"><span>Buy Ticket</span></a>
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

export default withHeader(withFooter(RegisterPage));