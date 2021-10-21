import { SendBox,MessageThread  } from '@azure/communication-react';
import { Panel,Stack } from '@fluentui/react';

import "./ChatUI.css";

function ChatUI({displayName, chatHistory, chatThreadClient, onDismis}) {
    const onSendMessageHandler=async(value)=>{
        let sendMessageRequest = { content: value };
        let sendMessageOptions = { senderDisplayName: displayName };
        let sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
    }
    const onRenderFooterContent=()=>{
        return <Stack>
        <SendBox
            onSendMessage={onSendMessageHandler}
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
        <MessageThread userId={'1'} messages={chatHistory} />

      </Panel>);
}

export default ChatUI;