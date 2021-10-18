import { SendBox,MessageThread  } from '@azure/communication-react';
import { Panel,Stack } from '@fluentui/react';
import ChatHistory from './ChatHistory';
import "./ChatUI.css";

function ChatUI({onDismis, onSendMessage}) {
    const onRenderFooterContent=()=>{
        return <Stack>
        <SendBox
            onSendMessage={onSendMessage}
            />
        </Stack>
    }
    return (<Panel
        isOpen={true}
        onDismiss={onDismis}
        headerText="Questions"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}        
        isFooterAtBottom={true}        
        >
        <MessageThread userId={'1'} messages={ChatHistory} />

      </Panel>);
}

export default ChatUI;