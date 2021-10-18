import { GridLayout, VideoTile   } from '@azure/communication-react';

function SessionVideo(params) {
    return (<GridLayout>
            <VideoTile displayName={'Jone Doe'} style={{backgroundColor: "#c8c6c4"}}/>
        </GridLayout>)
}


export default SessionVideo