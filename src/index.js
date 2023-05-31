import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css';
import "./styles/common.scss"
import {BrowserRouter} from "react-router-dom";
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://ff014c64521c4370a2c63abaf93ca92f@o4505249032962048.ingest.sentry.io/4505249037680640'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
