import * as React from 'react';
import { FluentThemeProvider } from "@azure/communication-react";
import { useContext,useEffect,useState } from "react";
import { ReactVideo } from "reactjs-media";
import { GetSessionById } from "../Services/ApiService";

import { Spinner, MessageBar, MessageBarType, Stack, Text} from '@fluentui/react';

import AppContext from "../Store/AppContext";


function WatchPage(props) {
    const {state, dispatch} = useContext(AppContext);
    const [loader, setLoader ] = useState({is: false, message: "" });
    const [error, setError] = useState({is: false, message: "" });
    const [session, setSession] = useState(null)
    useEffect(()=>{
        let sessionId =props.match.params.id;
        console.log("sessionId", sessionId);
        if(!sessionId){
            setError({is: true, message: "session id required"})
            return;
        }
        
        (async function() {
            setLoader({is: true, message: "Fetching session..." })
            let csession =await GetSessionById(sessionId);
            console.log("csession", csession);
            setLoader({is: false, message: "" })
            if(csession)
                setSession(csession)
            else 
            setError({is: true, message: "session not found"})
        })();

        
        
    },[])

    return(<FluentThemeProvider>
        {error.is === true && <MessageBar messageBarType={MessageBarType.error} style={{textAlign: "center"}}>
            {error.message}
        </MessageBar>}
        {loader.is === true && <div>           
            <Spinner label={loader.message}/>           
        </div>}
        {session !== null &&<Stack>
            <Stack style={{borderBottom: "1px solid gray", marginTop: "5px", paddingBottom: "5px"}}>
               <Text variant="xLarge"> {session.title}</Text>
            </Stack>
            <Stack style={{marginTop: "5px"}}>
            <ReactVideo
                src="https://www.example.com/url_to_video.mp4"
                poster="https://www.example.com/poster.png"
                primaryColor="red" 
                
            />
            </Stack>
        </Stack>}
        
    </FluentThemeProvider>)
}

export default WatchPage;