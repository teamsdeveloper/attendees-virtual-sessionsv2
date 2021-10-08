import React from "react";
import { Redirect } from "react-router";
import AppContext from "../../Store/AppContext";

const withAuthorize=(Component)=>{
    class Authorize extends React.Component{
        static contextType = AppContext;
        constructor(props){
            super(props);
        }
        render(){
            return(<>
                {this.context.state.user === null ? <Redirect to="/login"/> : <Component {...this.props}/>}
            </>);
        }
    }
    return Authorize;
}

export default withAuthorize