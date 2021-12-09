import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/global/errorMessage.scss";
import App from './App';
import { LoadingOverlay } from "./components/atoms/LoadingOverlay/LoadingOverlay";
import { LoadingOverlayProvider } from "./providers/LoadingOverlayProvider ";

ReactDOM.render(
  <React.StrictMode>
    <LoadingOverlayProvider>
      <App />
      <LoadingOverlay/>
    </LoadingOverlayProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

