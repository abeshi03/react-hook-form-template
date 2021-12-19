import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/global/errorMessage.scss";
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/pages/SignUp/SignUp";
import { Routing } from "./router/routing";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={Routing.top.path} element={<App />}/>
        <Route path={Routing.signUp.path} element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
