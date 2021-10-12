import Banner from "../Components/Banner";
import withFooter from "../Components/Hoc/withFooter";
import withHeader from "../Components/Hoc/withHeader";

function NewsPage(){
    return (<>
        <Banner page={"News"}/>
        <section>
        <div id="lgx-blog" className="lgx-blog">
        <div className="lgx-inner" style={{paddingTop: "59px", paddingBottom: "5px"}}>
            <div className="container">           

                <div className="blog-area">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="lgx-card-single">
                                <div className="card-inner">
                                    <figure>
                                        <a className="" href="blog-single.html"><img src="http://placehold.it/1167x565" alt="blog"/></a>
                                    </figure>
                                    <div className="content">
                                        <div className="cat-icon">
                                            <span>
                                                <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="text-area">
                                            <h3 className="title"><a href="blog-single.html">Internet Searches Inspire Because they Are Charitable Mahatmas</a></h3>
                                            <div className="hits-area">
                                                <span className="date"><a href="#">25 July 2016</a></span>
                                                <span className="hit-right">
                                                    <a href="#">50 Comments</a>
                                                    <a href="#">500 Views</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="lgx-card-single">
                                <div className="card-inner">
                                    <figure>
                                        <a className="" href="blog-single.html"><img src="http://placehold.it/1167x565" alt="blog"/></a>
                                    </figure>
                                    <div className="content">
                                        <div className="cat-icon">
                                            <span>
                                                <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className="text-area">
                                            <h3 className="title"><a href="blog-single.html">Internet Searches Inspire Because they Are Charitable Mahatmas</a></h3>
                                            <div className="hits-area">
                                                <span className="date"><a href="#">25 July 2016</a></span>
                                                <span className="hit-right">
                                                    <a href="#">50 Comments</a>
                                                    <a href="#">500 Views</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lgx-btn-area">
                    <a className="lgx-btn lgx-btn-big" href="blog-list.html"><span>View More News</span></a>
                </div>
            </div>
        </div>
    </div>
</section>
    </>)
}

export default withHeader(withFooter(NewsPage));