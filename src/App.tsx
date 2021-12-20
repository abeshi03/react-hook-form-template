// - フレームワーク =======================================================================================================
import React, { useEffect, useState, VFC } from 'react';

// - ルーティング ========================================================================================================
import { Routing } from "./router/routing";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const App: VFC = () => {

  const [ isLogin, setIsLogin ] = useState(false);

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
      <div>トップページです</div>
      <Link to={Routing.signUp.path}>会員登録</Link>
      {isLogin && <div>ログインしてます</div>}
      <div>{currentUser?.email}</div>
    </>
  );
}

export default App;
