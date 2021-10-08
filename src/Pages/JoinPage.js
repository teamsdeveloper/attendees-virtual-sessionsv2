
import { FluentThemeProvider, DEFAULT_COMPONENT_ICONS, StreamMedia, VideoTile, GridLayout, MessageThread } from '@azure/communication-react';
import { Stack, registerIcons } from '@fluentui/react';
import React from 'react';
import { CallClient, VideoStreamRenderer } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { Panel } from '@fluentui/react/lib/Panel';
import { ChatClient } from '@azure/communication-chat';
import {
  CallParticipant,
  CameraButton,
  ControlBar,
  EndCallButton,
  SendBox,
  MicrophoneButton,
  OptionsButton,
  ParticipantsButton,
  ScreenShareButton,
  VideoGallery
} from '@azure/communication-react';
import AppContext from '../Store/AppContext';
import AppConfig from '../Config/AppConfig';
import withAuthorize from '../Components/Hoc/withAuthorize';
import { JOINED_IN_SESSION_ACTION, LEFT_FROM_SESSION } from '../Store/Actions';
import MessageBox from '../Components/Join/MessageBox';




registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

class JoinPage extends React.Component {
  messageThreadStyles = {
    chatContainer: {
      backgroundColor: 'lightgray',
      padding: '15px'
    }
  };
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      session: null,
      noSessionFound: false,
      showLoader: false,
      state: "none",
      call: null,
      speakerStreams: [],
      showAskQuestions: false,
      questions: [],
      chatClient: null,
      chatThreadId: "",
      chatThreadClient: null,
      showMessageBox: false,
      messageBoxText: ""
    }
  }

  changeCssOnBodyTag = () => {
    document.body.classList.remove("home");
    document.body.classList.add("page");
    document.body.classList.add("page-template");
    document.getElementById("lgx-header").classList.add("menu-onscroll");

  }

  fetchAccessToken = async () => {
    let response = await fetch(`${AppConfig.baseWebApiUrl}/token`);
    let json = await response.json();
    this.setState({
      ...this.state,
      state: "Initilizing sdk"
    })
    this.init(json.token)
  }
  componentDidMount() {
    this.changeCssOnBodyTag();
    if (this.context.state.isInSession) {
      this.setState({
        ...this.state,
        showMessageBox: true,
        messageBoxText: "You are already in another session."
      })
      return;
    }
    if (!this.props.match.params.id) {
      this.setState({
        ...this.state,
        showMessageBox: true,
        messageBoxText: "Invalid session id."
      })
      return;
    }
    let index = this.context.state.sessions.map(session => session.id).indexOf(this.props.match.params.id);
    let session = null;
    if (index === -1) {
      index = this.context.state.liveSessions.map(session => session.id).indexOf(this.props.match.params.id);
      if (index === -1)
        return;
      else
        session = this.context.state.liveSessions[index];
    }
    else {
      session = this.context.state.sessions[index];
    }

    let joinUrl = session.joinUrl;
    let temp = joinUrl.replace("https://teams.microsoft.com/l/meetup-join/", "");
    let chatThreadId = temp.split("/0?context")[0];
    this.setState({
      ...this.state,
      session: session,
      showLoader: true,
      state: "Fetching token",
      chatThreadId: chatThreadId
    }, async () => {
      await this.fetchAccessToken()
    })
  }

  init = async (token) => {
    const { session } = this.state;
    console.log("session", session);
    const callClient = new CallClient();
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    let callAgent = await callClient.createCallAgent(tokenCredential, { displayName: "Guest" });
    let call = callAgent.join({ meetingLink: session.joinUrl }, {});

    call.on('stateChanged', async () => {
      if (call.state === "Connected" || call.state === "Disconnected") {

        if (call.state === "Disconnected") {
          this.context.dispatch({
            type: LEFT_FROM_SESSION
          });
        }
        if (call.state === "Connected") {
          await call.mute();
        }
        this.setState({
          ...this.state,
          state: call.state,
          showLoader: false
        })
      }
      else {
        this.setState({
          ...this.state,
          state: call.state,
          showLoader: true
        })
      }
      console.log("state", call.state);

      if (call.state === "Disconnected") {
        this.setState({
          ...this.state,
          call: null,
          speakerStreams: [],
          chatClient: null,
          chatThreadId: "",
          chatThreadClient: null
        }, () => {
          this.props.history.push("/sessions");
        })

      }

    });

    call.on('remoteParticipantsUpdated', (updateEvent) => {
      updateEvent.added.forEach((participant) => {
        //participant.displayName participant.identifier.microsoftTeamsUserId 

        console.log("participant", participant);
        participant.on("isSpeakingChanged", () => {

        });
        participant.on("videoStreamsUpdated", () => {

          participant.videoStreams.forEach(stream => {

            stream.on("isAvailableChanged", () => {
              this.streamAvailableChange(participant, stream);
            })
            this.streamAvailableChange(participant, stream);
          })
        })
      });

    });
    let chatClient = new ChatClient(
      AppConfig.acsEndpointUrl,
      new AzureCommunicationTokenCredential(token)
    );
    await chatClient.startRealtimeNotifications();

    let chatThreadClient = await chatClient.getChatThreadClient(this.state.chatThreadId);
    console.log("chatThreadClient", chatThreadClient);

    this.setState({
      ...this.state,
      call: call,
      chatClient: chatClient,
      chatThreadClient
    }, () => {
      this.context.dispatch({
        type: JOINED_IN_SESSION_ACTION
      })
    })

  }
  streamAvailableChange = (participant, stream) => {
    if (stream.mediaStreamType === "Video") {
      if (stream.isAvailable) {
        this.addRemoteParticipantToUI(participant, stream);
      }
      else {
        this.removeRemoteParticipant(participant, stream)
      }
    }
    if (stream.mediaStreamType === "ScreenSharing") {
      if (stream.isAvailable) {
        this.addRemoteParticipantToUI(participant, stream);
      }
      else {
        this.removeRemoteParticipant(participant, stream)
      }
    }
  }
  removeRemoteParticipant = (participant, stream) => {
    const { speakerStreams } = this.state;
    
    let streamId = `${participant.identifier.microsoftTeamsUserId}${stream.mediaStreamType}${stream.id}`;
    let speakerIndex = speakerStreams.map(ss => ss.streamId).indexOf(streamId);
    if (speakerIndex == -1)
      return;
    let speakers = speakerStreams.filter((ss) => ss.streamId !== streamId);

    this.setState({
      ...this.state,
      speakerStreams: [...speakers]
    }, () => {
      //document.getElementById(streamId).remove();
    });
  }
  async componentWillUnmount() {
    const { call } = this.state;
    if (call)
      await call.hangUp();

  }
  addRemoteParticipantToUI = async (participant, stream) => {
    let streamId = `${participant.identifier.microsoftTeamsUserId}${stream.mediaStreamType}${stream.id}`;
    let videoContainer = document.createElement("div");
    videoContainer.id = streamId;
    let renderer = new VideoStreamRenderer(stream);
    const view = await renderer.createView({ scalingMode: "Fit" });
    videoContainer.appendChild(view.target);
    let renderParticipant = {
      videoContainer,
      streamId,
      displayName: participant.displayName
    }
    
    this.setState({
      ...this.state,
      speakerStreams: [renderParticipant]
    })
  }
  onHangupHandler = async () => {
    const { call } = this.state;

    if (!call)
      return;
    await call.hangUp();

    this.props.history.push("/sessions");
  }
  renderNoSpeaker = () => {
    const { state, speakerStreams } = this.state;


    if (state === "Connected" && speakerStreams.length === 0) {
      return <Stack style={{ top: "50px" }}>
        <div className="alert alert-warning" role="alert">
          Speaker didn't share webcam and screen.
        </div>
      </Stack>
    }
    return null;
  }
  onShowPopupClickHandler = () => {
    this.setState({
      ...this.state,
      showAskQuestions: true
    })
  }
  onAskQuestionsPopupDismissHandler = () => {
    this.setState({
      ...this.state,
      showAskQuestions: false
    });
  }
  onSendMessageHandler = async (value) => {
    const { chatThreadClient, questions } = this.state;
    let sendMessageRequest = { content: value };
    let sendMessageOptions = { senderDisplayName: "Guest" };
    let sendChatMessageResult = await chatThreadClient.sendMessage(sendMessageRequest, sendMessageOptions);
    let messageId = sendChatMessageResult.id;
    this.setState({
      ...this.state,
      questions: [...questions, {
        quesstionText: value,
        questionId: messageId
      }]
    })
  }


  render() {

    return (<FluentThemeProvider>
      <div id="lgx-schedule" className="lgx-schedule">
        <div className="lgx-inner" style={{ paddingTop: "80px", paddingBottom: "5px" }}>
          <div className="container">
            <Stack style={{ width: "100%" }}>

              {this.state.showMessageBox === true &&<MessageBox message={this.state.messageBoxText}/>}

              {this.state.session !== null && <div style={{ display: "flex", width: "100%", borderBottom: "1px solid" }}>
                <div style={{ display: "flex", width: "70%" }}>
                  <h3>{this.state.session.title}</h3>
                </div>
                {this.state.call !== null && <div style={{ display: "flex", justifyContent: "right", width: "30%", alignItems: "center" }}>

                  <EndCallButton onClick={this.onHangupHandler} />
                </div>}

              </div>}

              {this.state.showLoader === true && <Stack style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {this.state.state === "" && <div className="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>}
                <div style={{ marginTop: "50px" }}>
                  {this.state.state}
                </div>
              </Stack>}
              {this.renderNoSpeaker()}
              {this.state.speakerStreams.length > 0 && <div className="row">
                <div class="col-md-9" style={{ height: "75vh" }}>
                  <GridLayout>
                    {this.state.speakerStreams.map((speaker, index) => {
                      return <VideoTile key={index}
                        displayName={speaker.displayName}
                        renderElement={
                          <StreamMedia videoStreamElement={speaker.videoContainer} />
                        }
                      />
                    })}
                  </GridLayout>

                </div>
                <div class="col-md-3">
                  <h3>Ask questions</h3>
                  <div style={{ height: "58vh", overflow: 'hidden', overflowY: "scroll", scrollbarWidth: "none" }} id="askquestions">
                    <ul className="list-group list-group-horizontal-xxl">
                      {this.state.questions.map((question, index) => <li key={index} className="list-group-item">{question.quesstionText}</li>)}
                    </ul>

                  </div>
                  <SendBox
                    onSendMessage={async (value) => {
                      await this.onSendMessageHandler(value);
                      return;
                    }}

                  />

                </div>
              </div >

              }

            </Stack>
          </div>
        </div>
      </div>
    </FluentThemeProvider>)
  }
}

export default withAuthorize(JoinPage);