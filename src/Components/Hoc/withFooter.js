import React from "react";
import Footer from "../Footer";

const withFooter =(Component)=>{
    class ComponentWithFooter extends React.Component{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            
        }
        render(){
            return(<>
                 <Component {...this.props}/>
                 <Footer/>
            </>)
        }
    }
    return ComponentWithFooter;
};



export default withFooter;
