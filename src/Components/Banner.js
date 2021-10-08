

function Banner({page, subPage}){
    document.body.classList.remove("home");
    document.body.classList.add("page");
    document.body.classList.add("page-template");
    
    return(<section>
        <div className="lgx-banner lgx-banner-inner">
            <div className="lgx-inner-bg">
                <div className="lgx-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="lgx-heading-area">
                                    <h2 className="lgx-heading lgx-heading-brand">
                                        <span className="back-heading">
                                            <i className="fa fa-microphone" aria-hidden="true"></i></span>
                                        <span className="heading">{page}</span>
                                    </h2>
                                    <ul className="breadcrumb" >
                                        <li><a><i className="icon-home6"></i>Home</a></li>
                                        <li   className={subPage === undefined ? "active": ""}>{page}</li>
                                        {subPage !== undefined && <li class="active">{subPage}</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Banner;