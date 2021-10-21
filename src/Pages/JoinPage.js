import { FluentThemeProvider } from "@azure/communication-react";
import {Stack, MessageBarType} from '@fluentui/react';
import React from "react";
import ChatUI from "../Components/Join/ChatUI";
import MessageBox from "../Components/Join/MessageBox";
import SessionStatus from "../Components/Join/SessionStatus";
import SessionTitleBar from "../Components/Join/SessionTitleBar";
import SessionVideo from "../Components/Join/SessionVideo";
import AppConfig from "../Config/AppConfig";
import { GetSessionById } from "../Services/ApiService";
import { CallClient, VideoStreamRenderer } from "@azure/communication-calling";
import { Features } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatClient } from '@azure/communication-chat';
import SessionMessage from "../Components/Join/SessionMessage";
import AppContext from "../Store/AppContext";
import withAuthorize from "../Components/Hoc/withAuthorize";
import { JOINED_IN_SESSION_ACTION, LEFT_FROM_SESSION } from "../Store/Actions";

class  JoinPage extends React.Component{
    static contextType = AppContext;
    constructor(props){
        super(props);
        
        this.state = {
            showQuestionPanel: false,
            sessionStatus: {show: false, message: ""},
            messageBox: {show: false, message: "", type: ""},
            participantCount: 0,
            unreadQuestions: 0,                    
            attendeeName: "",
            callAgent: null,
            call: null,
            chatClient: null,
            chatThreadClient: "",
            speakers: [],
            chatHistory: [],
            session: null,

        }
    }
    fetchAcsToken=async ()=>{
        this.setState({
            ...this.state,            
            sessionStatus: {show: true, message: "Fetching token"},
        });

        let response = await fetch(`${AppConfig.baseWebApiUrl}/token`);
        return await response.json();
        
      }
      fetchSession=async()=>{
        this.setState({
            ...this.state,
            sessionStatus: {show: true, message: "Fetching session information"},
        });

        if(!this.props.match.params.id)
            return null;
        
        return await GetSessionById(this.props.match.params.id);
      }
    async componentDidMount(){
        let session = await this.fetchSession();
        
        if(session == null){
            this.setState({
                ...this.state,                
                sessionStatus: {show: false, message: ""},
                messageBox: {show: true, message: "Error occured when fetching session information", type: "error"}
            });
            return;
        }
        if(session.status != "InLive"){
            this.setState({
                ...this.state,
                sessionStatus: {show: false, message: ""},
                session: session,
                messageBox: {show: true, message: "This session is not in live", type: "error"}
            });
            return;
        }
        if(this.context.state.isInSession){
            this.setState({
                ...this.state,
                sessionStatus: {show: false, message: ""},
                session: session,
                messageBox: {show: true, message: "You are already in a session", type: "error"}
            });
            return;
        }
        
        this.setState({
            ...this.state,
            attendeeName: this.context.state.user.username,
            session
            
        });

        let token = await this.fetchAcsToken();

        if(token === null){
            this.setState({
                ...this.state,              
                sessionStatus: {show: false, message: ""},  
                messageBox: {show: true, message: "Error occured when fetching access token", type: "error"}
            });
        }

        await this.initAcsSkd(token, session)
    }
    getThreadId=(url)=>{        
        let temp = url.replace("https://teams.microsoft.com/l/meetup-join/", "");
        let chatThreadId = temp.split("/0?context")[0];
        return chatThreadId;
    }
    initAcsSkd=async(token, session)=>{
        const {attendeeName} = this.state;
        console.log("session", session);
        console.log("token", token);
        this.setState({
            ...this.state,
            sessionStatus: {show: true, message: "Initializing acs sdk"},
        })

        const callClient = new CallClient();        
        const tokenCredential = new AzureCommunicationTokenCredential(token.token);
        let callAgent = await callClient.createCallAgent(tokenCredential, {displayName: attendeeName});
        let call = callAgent.join({meetingLink: session.joinUrl}, {});
        call.on('stateChanged', async() => {

            if(call.state === "Disconnected"){
                this.setState({
                    ...this.state,
                    call: null,
                    chatThreadId: "",
                    chatClient: null,
                    chatHistory: [],
                    chatThreadClient:  null
                });
                this.context.dispatch({
                    type: LEFT_FROM_SESSION
                })
                this.props.history.push("/");
            }

            if(call.state === "Connected"){
                await call.mute();
                this.setState({
                    ...this.state,                    
                    sessionStatus: {show: false, message: ""},
                });

                
            }
            else{
                this.setState({
                    ...this.state,                    
                    sessionStatus: {show: true, message: `${call.state}`},
                }); 
            }
        });

        call.remoteParticipants.forEach(remoteParticipant => {
            this.subscribeToRemoteParticipant(remoteParticipant);
        });

        call.on('remoteParticipantsUpdated', e => {
            e.added.forEach(remoteParticipant => {
                console.log('Remote participant added from the call.');
                this.subscribeToRemoteParticipant(remoteParticipant)
            });
            e.removed.forEach(remoteParticipant => {
                console.log('Remote participant removed from the call.');
            });
            this.setState({
                ...this.state,
                participantCount: call.remoteParticipants.length
            })
        });

        let chatThreadId = this.getThreadId(session.joinUrl);
        await this.initAcsChat(token, session, chatThreadId);
        this.setState({
            ...this.state,
            call: call,
            callAgent: callAgent,
            participantCount: call.remoteParticipants.length
        },()=>{
            this.context.dispatch({
                type: JOINED_IN_SESSION_ACTION
            });
        })
    }   
    initAcsChat=async(token, session, threadId)=>{           
        const tokenCredential = new AzureCommunicationTokenCredential(token.token);
        const chatClient = new ChatClient(AppConfig.acsEndpointUrl, tokenCredential)
        await chatClient.startRealtimeNotifications();
        chatClient.on("chatMessageReceived", (e) => {               
            
            if(e.type === "Text"){
                let message = {
                    type: 'chat',
                    payload: {
                      senderId: e.sender.microsoftTeamsUserId,
                      senderDisplayName: e.senderDisplayName,
                      messageId: e.id,
                      content: e.message,
                      createdOn: new Date(e.createdOn),
                      mine: this.state.attendeeName === e.senderDisplayName ? true : false,
                      attached: false,
                      type: 'text'
                    }
                  }

                  this.setState({
                      ...this.state,
                      unreadQuestions: this.state.showQuestionPanel === false ? this.state.unreadQuestions + 1:this.state.unreadQuestions,
                      chatHistory: [message,...this.state.chatHistory]
                  })

            }
        });
        const chatThreadClient = chatClient.getChatThreadClient(threadId);
        this.setState({
            ...this.state,
            chatClient,
            chatThreadClient
        })

    }
    async componentWillUnmount(){
        const {call} = this.state;
        if(call)
            await call.hangUp();

    }
    subscribeToRemoteParticipant =(remoteParticipant)=>{
        console.log('remoteParticipant.videoStreams', remoteParticipant.videoStreams.length);
        remoteParticipant.videoStreams.forEach(remoteVideoStream => {
            this.subscribeToRemoteVideoStream(remoteParticipant, remoteVideoStream)
        });
        remoteParticipant.on('videoStreamsUpdated', e => {            
            e.added.forEach(remoteVideoStream => {
                this.subscribeToRemoteVideoStream(remoteParticipant, remoteVideoStream)
            });
            
            e.removed.forEach(remoteVideoStream => {
                console.log('Remote participant video stream was removed.');
            })
        });
    }
    subscribeToRemoteVideoStream = async (remoteParticipant, stream) => {
        let streamId = `${remoteParticipant.identifier.microsoftTeamsUserId}${stream.mediaStreamType}${stream.id}`;
        stream.on('isAvailableChanged', async () => {
            
            if (stream.isAvailable){
                this.addRemoteVideo(remoteParticipant, stream, streamId);
            }
            else{
                this.removeRemoteVideo(stream, streamId);
            }
        });
        
        if(stream.isAvailable){
            console.log("stream", stream);
            this.addRemoteVideo(remoteParticipant, stream, streamId);
        }
    }
    addRemoteVideo= async(participant, stream,streamId)=>{
        console.log("video added");
        let videoContainer = document.createElement("div");
        videoContainer.id = streamId;
        let renderer = new VideoStreamRenderer(stream);
        const view = await renderer.createView({ scalingMode: "Stretch" });
        videoContainer.appendChild(view.target);
        let speaker = {
          videoContainer,
          streamId,
          displayName: participant.displayName
        }
        this.setState({
            ...this.state,
            speakers: [...this.state.speakers, speaker]
          });
    }
    
    removeRemoteVideo=(stream,streamId)=>{       
        console.log("video removed"); 
        let speakerIndex = this.state.speakers.map(ss => ss.streamId).indexOf(streamId);
        if (speakerIndex == -1)
          return;
        let speakers = this.state.speakers.filter((ss) => ss.streamId !== streamId);
    
        this.setState({
          ...this.state,
          speakers: [...speakers]
        });

    }
    onHangup=async()=>{
        const {call} = this.state;
        if(call !== null)
            await call.hangUp();
    }
    onAskQuestionsHandler=()=>{
        this.setState({
            ...this.state,
            showQuestionPanel: !this.state.showQuestionPanel,
            unreadQuestions: 0
        })
    }
    onDismisHandler=()=>{
        this.setState({
            ...this.state,
            showQuestionPanel: false
        })
    }
    renderNoSpeakerMessage=()=>{
        const {call, speakers} = this.state;
        if(!call)
            return;
        if(call.state === "Connected" && speakers.length ===0)
            return <SessionMessage message={"No speaker video or screen sharing"} type={MessageBarType.warning}/>
        return null;
    }
    render(){
        return (<FluentThemeProvider>
            <Stack style={{backgroundColor: "#c8c6c4", height: "100vh", width: "100%"}}>
                <Stack style={{paddingTop: "70px", margin:"10px"}}>
                   {this.state.session && <Stack>
                        <SessionTitleBar 
                        title={this.state.session.title}
                        description={this.state.session.description} 
                        showEndCallButton={this.state.call !== null} 
                        showOtherButtons={(this.state.call !== null && this.state.call.state === "Connected")} 
                        onHangup={this.onHangup}
                        unReadAnswersCount={this.state.unreadQuestions}
                        totalParticipants={this.state.participantCount}
                        onAskQuestions={this.onAskQuestionsHandler}
                        />
                    </Stack>}
                </Stack>
                {this.state.messageBox.show == true && <SessionMessage 
                    message={this.state.messageBox.message} type={this.state.messageBox.type} />
                }
                {this.state.sessionStatus.show  == true && <SessionStatus 
                    message={this.state.sessionStatus.message} 
                    />
                }
                {this.renderNoSpeakerMessage()}        
                {this.state.speakers.length > 0 &&<div style={{width: "100%", height: "80vh"}}>
                    <SessionVideo speakers={this.state.speakers}/>
                </div>}
                {this.state.showQuestionPanel && <ChatUI
                    chatHistory={this.state.chatHistory}
                    chatThreadClient={this.state.chatThreadClient}
                    displayName={this.state.attendeeName}
                    onDismis={this.onDismisHandler}
                
                />}
            </Stack>
        </FluentThemeProvider>);
    }
    
}


export default withAuthorize(JoinPage);
