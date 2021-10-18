import { useReducer } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
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
import WatchPage from './Pages/WatchPage';
import NewJoinPage from './Pages/NewJoinPage';

initializeIcons();

function App(props) {
  const [state, dispatch] = useReducer(reducer, AppInitialState);  
  
  const renderLayout=()=>{
    console.log("props.location.pathname", props);
    if(props.location.pathname.includes('/join/') || props.location.pathname.includes('/watch'))
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
          <Route exact path='/sessions/:id/watch' component={WatchPage} />
          <Route exact path='/sessions' component={SessionsPage} />
          <Route path='/sponsors' component={SponsorsPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/news' component={NewsPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/buy' component={BuyTicketsPage} />
          <Route path='/join/:id' component={JoinPage} />
          <Route path="/login" component={LoginPage} />  
          <Route path="/newjoin/:id" component={NewJoinPage} />  
      </div>
      
    </AppContext.Provider>
  );
}

export default withRouter( App);
