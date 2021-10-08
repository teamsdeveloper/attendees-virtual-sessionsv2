import React from "react";
import Footer from "../Footer";

const withFooter =(Component)=>{
    class ComponentWithFooter extends React.Component{

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
