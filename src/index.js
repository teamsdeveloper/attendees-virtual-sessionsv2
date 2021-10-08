import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');
ReactDOM.render(
  
      <BrowserRouter>
          <React.StrictMode>
              <App />
          </React.StrictMode>
      </BrowserRouter>
  ,
  document.getElementById('root')
);

