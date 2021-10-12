import NavBar from "./NavBar";

function Layout(props) {
    
    return (
        
            <header>
                <div id="lgx-header" className="lgx-header menu-onscroll">
                    <div className="lgx-header-inner">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <nav id="menu-offscroll" className="navbar navbar-default lgx-navbar">
                                        <div className="container">
                                            <NavBar/>
                                        </div>

                                    </nav>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </header>
        
    )
}


export default Layout;