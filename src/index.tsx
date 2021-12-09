import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/global/errorMessage.scss";
import App from './App';
import { LoadingOverlay } from "./components/atoms/LoadingOverlay/LoadingOverlay";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingOverlay/>
  </React.StrictMode>,
  document.getElementById('root')
);

