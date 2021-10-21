import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Store/AppContext";
import { LOGOUT_ACTION } from "../Store/Actions";

function NavBar(props){
    const {state, dispatch} = useContext(AppContext);
    console.log("props", props)
    const onLogoutHandler=()=>{
        dispatch({
            type: LOGOUT_ACTION
        })
        
    }
    return(<nav className="navbar navbar-default lgx-navbar">
    <div className="lgxcontainer">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse"
                data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <div className="lgx-logo">
                <a href="index.html" className="lgx-scroll">
                    <img src="http://placehold.it/226x74" alt="Logo" />
                </a>
            </div>
        </div>
        <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav lgx-nav">
                <li className="dropdown">                    
                    <Link className="lgx-scroll" to="/">Home</Link>
                </li>
                <li><Link className="lgx-scroll" to="/speakers">Speakers</Link></li>
                <li><Link className="lgx-scroll" to="/sessions">Sessions</Link></li>
                <li><Link className="lgx-scroll" to="/sponsors">Sponsors</Link></li>
                <li><Link className="lgx-scroll" to="/register">Register</Link></li>
                {state.user !== null &&<li><Link className="lgx-scroll" onClick={onLogoutHandler} to="/">Logout</Link></li>}
                {state.user === null &&<li><Link className="lgx-scroll" to="/login">Login</Link></li>}
                <li><Link className="lgx-scroll" to="/news">News</Link></li>
                <li><Link className="lgx-scroll" to="/contact">Contact</Link></li>
                {/*<li><Link className="lgx-scroll" to="/newjoin/1234567890">New Join</Link></li>*/}
                {/*<li><Link className="lgx-scroll lgx-btn" to="/buy"><span>Buy Ticket</span></Link></li>*/}
            </ul>
        </div>

    </div>
</nav>)
}


export default NavBar;