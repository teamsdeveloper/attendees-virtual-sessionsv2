import { useState } from "react";
import { useContext } from "react";
import Banner from "../Components/Banner";
import { LOGIN_ACTION } from "../Store/Actions";
import AppContext from "../Store/AppContext";

function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const {state, dispatch} = useContext(AppContext);

    const onUsernameChangeHandler=(event)=>{
        setUsername(event.target.value)
    }
    const onPasswordChangeHandler=(event)=>{
        setPassword(event.target.value);
    }
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        if(!username){
            alert("Username required");
            return;
        }

        if(!password){
            alert("Password required");
            return;
        }

        dispatch({
            type: LOGIN_ACTION,
            payload: {
                username
            }
        });
        props.history.push("/sessions");
    }

    
    document.body.classList.remove("home"); 
    document.body.classList.add("page");
    document.body.classList.add("page-template");
    return(<>
        <Banner page={"Login"} />
        <section>
            <div id="lgx-schedule" className="lgx-schedule">
                <div className="lgx-inner" style={{paddingTop: "59px", paddingBottom: "5px"}}>
                    <div className="container">
                        
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-sm-12 col-md-4">
                                <div className="lgx-tab">
                                <form className="lgx-contactform" onSubmit={onSubmitHandler} style={{paddingLeft: "50px",paddingRight: "50px"}}>
                                    <div className="form-group">
                                        <input type="text"  value={username} onChange={onUsernameChangeHandler} className="form-control lgxname"  placeholder="Enter the username" required/>
                                    </div>

                                    <div className="form-group">
                                        <input type="password"  value={password} onChange={onPasswordChangeHandler} className="form-control lgxemail"  placeholder="Enter the password" required/>
                                    </div>
                                     <button  type="submit" className="lgx-btn lgx-btn-big hvr-glow hvr-radial-out lgxsend lgx-send"><span>Login</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>)
}


export default LoginPage;
