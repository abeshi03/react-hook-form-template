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

  const logout = (): void => {

    signOut(auth)
      .then(() => {
        navigate(Routing.signIn.path);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "SUCCESS",
            message: "ログアウトしました"
          }
        }));
      })
      .catch((error: unknown) => {
        console.log(error);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "ログアウトに失敗いたしました"
          }
        }));
      })
  }

  return (
    <>
      <div>トップページです</div>
        {!isLogin && <Link to={Routing.signUp.path}>会員登録</Link>}
        {!isLogin && <Link to={Routing.signIn.path}>ログイン</Link>}
        {isLogin && <button onClick={logout}>ログアウト</button>}
      <div>{currentUser?.email}</div>
    </>
  );
}

export default App;
