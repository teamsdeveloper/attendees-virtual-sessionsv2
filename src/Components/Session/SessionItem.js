import React, { useContext, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, Redirect } from "react-router-dom";
import Popout from "react-popout";
import { JoinSession } from "../Join/JoinSession";
import AppContext from "../../Store/AppContext";
import { useHistory } from "react-router-dom";

import { JOIN_SESSION_ACTION } from "../../Store/Actions";

function SessionItem({id, title, dateAndTime, description,speakerName, joinUrl, imageUrl}){    
    const {state, dispatch} = useContext(AppContext);
    
    const history = useHistory();
    useEffect(()=>{
        console.log("state", state)
    }, [state]);
    const getDate=(dt)=>{
        if(dateAndTime === undefined === undefined || dateAndTime === null)
            return null;
        let date = new Date(dt);
        return date.toLocaleDateString("en-US");            
    }
    const getTime=(dt)=>{
        if(dateAndTime === undefined === undefined || dateAndTime === null)
            return null;
        let date = new Date(dt);        
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
   const onJoinClickHandler=()=>{
       
       if(state.user === null){
            history.push("/login");
            return;
       }

       if(state.isInSession){
           alert("You are already in session");
           return;
       }

    window.open(`/join/${id}`);
  }
   
  
    //dateAndTime
    return (<div className="lgx-single-tab">
    <div className="row">
        <div className="col-xs-12 col-sm-2">
            <div className="time-area">
                <h4 className="time"><span>{getDate(dateAndTime)}</span></h4>
                <h4 className="time"><p>{getTime(dateAndTime)}</p></h4>
            </div>
        </div>
        <div className="col-xs-12 col-sm-3">
            <div className="author">
                <a className="author-img" href="speaker-single.html"><img src={imageUrl} alt="Speaker"/></a>
                <div className="author-info">
                    <h5 className="name"><a href="speaker-single.html">{speakerName}</a></h5>
                    
                </div>
            </div>
        </div>
        <div className="col-xs-12 col-sm-5">
            <div className="schedule-info">
                <h3 className="title"><a href="#">{title}</a></h3>
                <p>{description}</p>
            </div>
            
        </div>
        <div className="col-xs-12 col-sm-2">
            <button type="button" className="lgx-scroll lgx-btn" onClick={onJoinClickHandler}><span>Join Now</span></button>
        </div>
    </div>
    
    
     
</div>);
}

export default SessionItem;