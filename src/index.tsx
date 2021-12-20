import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./assets/styles/global/errorMessage.scss";
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/pages/SignUp/SignUp";
import { Routing } from "./router/routing";
import { store } from "./store";
import { Provider } from "react-redux";
import { FloatingNotificationBar } from "./features/floatingNotificationBar/FloatingNotificationBar";
import { SignIn } from "./components/pages/SignIn/SignIn";
import { PasswordReset } from "./components/pages/PasswordReset/PasswordReset";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FloatingNotificationBar/>
      <BrowserRouter>
        <Routes>
          <Route path={Routing.top.path} element={<App />}/>
          <Route path={Routing.signUp.path} element={<SignUp/>}/>
          <Route path={Routing.signIn.path} element={<SignIn/>}/>
          <Route path={Routing.passwordReset.path} element={<PasswordReset/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
