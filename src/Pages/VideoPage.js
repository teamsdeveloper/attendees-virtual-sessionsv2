import { useContext,useEffect,useState } from "react";
import { ReactVideo } from "reactjs-media";


import AppContext from "../Store/AppContext";

function VideoPage(props) {
    const {state, dispatch} = useContext(AppContext);
    const [session, setSession] = useState(null)
    useEffect(()=>{
        let sessionId =props.match.params.id;
        let index = state.sessions.map((session)=> session.id).indexOf(sessionId);
        if(index === -1)
            return;

        setSession(state.sessions[index]);
        
    })

    return(<>
        {session !==null && <ReactVideo
                src="https://www.example.com/url_to_video.mp4"
                poster="https://www.example.com/poster.png"
                primaryColor="red"                
            />}
    </>)
}

export default VideoPage;