import { Link } from "react-router-dom";

function SessionItem({id, title, dateAndTime, description,speakerName, joinUrl, imageUrl, history}){
    
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
            <Link className="lgx-scroll lgx-btn" to={`/join/${id}`}><span>Join Now</span></Link>
        </div>
    </div>
</div>);
}

export default SessionItem;