import React from "react";
import Layout from "../Layout";

function withHeader(Component) {
    class Header extends React.Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            console.log("withHeader", this.props);
        }
        render(){
            return(<Layout>
                <Component {...this.props2}/>
            </Layout>)
        }
    }
    return Header;
}

export default withHeader;