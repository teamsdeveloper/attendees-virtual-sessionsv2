import { useReducer } from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import BuyTicketsPage from './Pages/BuyTicketsPage';
import ContactPage from './Pages/ContactPage';
import HomePage from './Pages/HomePage';
import JoinPage from './Pages/JoinPage';
import NewsPage from './Pages/NewsPage';
import RegisterPage from './Pages/RegisterPage';
import SessionsPage from './Pages/SessionsPage';
import SpeakerPage from './Pages/SpeakerPage';
import SpeakersPage from './Pages/SpeakersPage';
import SponsorsPage from './Pages/SponsorsPage';
import AppContext from './Store/AppContext';
import { AppInitialState } from './Store/AppInitialState';
import reducer from './Store/AppReducer';
import "./App.css"
import LoginPage from './Pages/LoginPage';
import VideoPage from './Pages/VideoPage';
import Popout from "react-popout";

import { LEFT_FROM_SESSION } from './Store/Actions';
import JoinSession from './Components/Join/JoinSession';

function App(props) {
  const [state, dispatch] = useReducer(reducer, AppInitialState);


  const onPopoutCloseHandler = () => {
    dispatch({ type: LEFT_FROM_SESSION })
  }
  const renderPopout = () => {
    const { joinSession } = state;

    if (!joinSession)
      return null;
    return <Popout onClosing={onPopoutCloseHandler} title={joinSession.title}>
      <JoinSession dispatch={dispatch} state={state} />
    </Popout>
  }
  const renderLayout=()=>{
    console.log("props.location.pathname", props);
    if(props.location.pathname.includes('/join/'))
      return null;
    return <Layout/>    
  }
  return (

    <AppContext.Provider value={{ state, dispatch }}>
      <div class="lgx-container ">
          {renderLayout()}
          <Route exact path='/' component={HomePage} />
          <Route exact path='/speakers' component={SpeakersPage} />
          <Route exact path='/speakers/:id' component={SpeakerPage} />
          <Route exact path='/sessions/:id/video' component={VideoPage} />
          <Route path='/sessions' component={SessionsPage} />
          <Route path='/sponsors' component={SponsorsPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/news' component={NewsPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/buy' component={BuyTicketsPage} />
          <Route path='/join/:id' component={JoinPage} />
          <Route path="/login" component={LoginPage} />       

      
      </div>
      
    </AppContext.Provider>
  );
}

export default withRouter( App);
