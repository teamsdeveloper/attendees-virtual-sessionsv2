import {
    EndCallButton
  } from '@azure/communication-react';
  import {  DEFAULT_COMPONENT_ICONS} from '@azure/communication-react';
  import { Stack, registerIcons } from '@fluentui/react';
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

function SessionTitleBar({title, showEndCallButton, onHangup}) {
    return(
        <div style={{ display: "flex", width: "100%", borderBottom: "1px solid" }}>
                <div style={{ display: "flex", width: "70%" }}>
                  <h3>{title}</h3>
                </div>
                {showEndCallButton === true && <div style={{ display: "flex", justifyContent: "right", width: "30%", alignItems: "center" }}>

                  <EndCallButton onClick={onHangup} />
                </div>}

              </div>
    )   
}


export default SessionTitleBar;