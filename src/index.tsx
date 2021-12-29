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
import { SignIn } from "./components/pages/SignIn/SignIn";
import { PasswordReset } from "./components/pages/PasswordReset/PasswordReset";
import { Layout } from "./components/layouts/Layout";
import { PostAddingPage } from "./components/pages/Post/Add/PostAddingPage";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout/>
        <Routes>
          <Route path={Routing.top.path} element={<App />}/>
          <Route path={Routing.signUp.path} element={<SignUp/>}/>
          <Route path={Routing.signIn.path} element={<SignIn/>}/>
          <Route path={Routing.passwordReset.path} element={<PasswordReset/>}/>
          <Route path={Routing.post.add.path} element={<PostAddingPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
