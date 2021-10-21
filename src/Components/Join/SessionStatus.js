import { Spinner,Stack } from '@fluentui/react';


function SessionStatus({message}) {    
    return (<Stack>
        <Spinner label={message} />
    </Stack>) 
}

export default SessionStatus;