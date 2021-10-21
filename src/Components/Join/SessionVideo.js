import { GridLayout, VideoTile,StreamMedia   } from '@azure/communication-react';

function SessionVideo({speakers}) {
    return (<>
        {speakers.map((speaker, index)=> <VideoTile 
            key={index} 
            displayName={speaker.displayName}
            renderElement={
                <StreamMedia videoStreamElement={speaker.videoContainer} />
              }
            style={{backgroundColor: "#c8c6c4"}}/>)}        </>)
}


export default SessionVideo