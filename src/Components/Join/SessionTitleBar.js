import {
  EndCallButton
} from '@azure/communication-react';

import { DEFAULT_COMPONENT_ICONS } from '@azure/communication-react';
import { Stack, registerIcons, Text } from '@fluentui/react';
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

const mailIcon = { iconName: 'Mail' };

function SessionTitleBar({ title, description, showEndCallButton, showOtherButtons, totalParticipants, unReadAnswersCount, onHangup, onAskQuestions }) {

  
  return (
    <div style={{ display: "flex", width: "100%", borderBottom: "1px solid", paddingBottom: "10px" }}>
      <div style={{ display: "flex", width: "70%", flexDirection: "column" }}>
        <Text variant={"xLarge"}>{title}</Text>
        <Text variant={"small"}>{description}</Text>
      </div>
      <div style={{ display: "flex", justifyContent: "right", width: "30%", alignItems: "center" }}>
        {showOtherButtons === true && <>

          <button type="button" className="btn btn-secondary" style={{ marginRight: "10px" }} onClick={onAskQuestions}>
            Ask Questions  &nbsp;
            <span className="badge badge-danger">{unReadAnswersCount}</span>
            <span className="sr-only">unread messages</span>
          </button>
          <button type="button" className="btn btn-success" style={{ marginRight: "10px" }}>
            Total attendees &nbsp;
            <span className="badge badge-pill badge-danger disabled">{totalParticipants}</span>
          </button>
          
        </>}
        {showEndCallButton === true &&<EndCallButton onClick={onHangup} />}
      </div>
    </div>
  )
}


export default SessionTitleBar;