import { FluentThemeProvider } from "@azure/communication-react";
import {Stack} from '@fluentui/react';
import React from "react";
import ChatUI from "../Components/Join/ChatUI";
import SessionTitleBar from "../Components/Join/SessionTitleBar";
import SessionVideo from "../Components/Join/SessionVideo";


class  NewJoinPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showQuestionPanel: false
        }
    }
    onHangup=()=>{

    }
    onAskQuestionsHandler=()=>{
        this.setState({
            ...this.state,
            showQuestionPanel: !this.state.showQuestionPanel
        })
    }
    onDismisHandler=()=>{
        this.setState({
            ...this.state,
            showQuestionPanel: false
        })
    }
    render(){
        return (<FluentThemeProvider>
            <Stack style={{backgroundColor: "#c8c6c4", height: "100vh", width: "100%"}}>
                <Stack style={{paddingTop: "70px", margin:"10px"}}>
                    <Stack>
                        <SessionTitleBar 
                        title={"demo title"}
                        description={"this is test description for session"} 
                        showEndCallButton={true} 
                        onHangup={this.onHangup}
                        unReadAnswersCount={5}
                        totalParticipants={100}
                        onAskQuestions={this.onAskQuestionsHandler}
                        />
                    </Stack>
                </Stack>
                <Stack style={{width: "100%", height: "80vh"}}>
                    <SessionVideo/>
                </Stack>
                {this.state.showQuestionPanel && <ChatUI
                    onDismis={this.onDismisHandler}
                
                />}
            </Stack>
        </FluentThemeProvider>);
    }
    
}


export default NewJoinPage;
