// - フレームワーク =======================================================================================================
import React, { useEffect, useState, VFC } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

// - ルーティング ========================================================================================================
import { Routing } from "./router/routing";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "./features/floatingNotificationBar/floatingNotificationBarSlice";
import { Header } from "./components/layouts/Header/Header";

const App: VFC = () => {

  const [ isLogin, setIsLogin ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      }
    })
  }, [])

  const currentUser = auth.currentUser;

  return (
    <>
      <Header/>
      <div>トップページです</div>
      <div>{currentUser?.email}</div>
    </>
  );
}

export default App;
