import { useReducer } from 'react';
import { Route, Switch } from 'react-router';

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

function App(props) {
  const [state, dispatch] = useReducer(reducer, AppInitialState)
  
  return (
    <AppContext.Provider value={{state, dispatch}}>
  <Layout >
    <Switch>
      <Route exact path='/' component={HomePage}/>      
      <Route  exact path='/speakers' component={SpeakersPage}/>
      <Route  exact path='/speakers/:id'  component={SpeakerPage}/>
      <Route  path='/sessions' component={SessionsPage}/>
      <Route  path='/sponsors' component={SponsorsPage}/>
      <Route  path='/register' component={RegisterPage}/>
      <Route  path='/news' component={NewsPage}/>
      <Route  path='/contact' component={ContactPage}/>
      <Route  path='/buy' component={BuyTicketsPage}/>      
      <Route  path='/join/:id' component={JoinPage}/>
      <Route path="/login" component={LoginPage}/>
    </Switch>
    
  </Layout>
  </AppContext.Provider>
  );
}

export default App;
