function Footer() {
    return (<footer>
        <div id="lgx-footer" className="lgx-footer">
            <div className="lgx-footer-bg">
                <div className="lgx-inner" style={{paddingBottom: "5px", paddingTop: "50px"}}>
                    <div className="container">        
                        
                        <div className="footer-social">
                            <ul className="list-inline">
                                <li><a className="sp-fb" href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="sp-tw" href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a className="sp-google" href="#"><i className="fa fa-google-plus"></i></a></li>
                                <li><a className="sp-in" href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a className="sp-" href="#"><i className="fa fa-soundcloud"></i></a></li>
                                <li><a className="sp-" href="#"><i className="fa fa-video-camera"></i></a></li>
                            </ul>
                        </div>
                        <p className="lgx-copyright"> 
                            <span className="text">Powered by</span> 
                            <a style={{marginLeft: "10px"}}>
                                Digtal Conference 2022
                            </a>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    </footer>
    )
}


export default Footer;