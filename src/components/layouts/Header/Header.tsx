// - フレームワーク =======================================================================================================
import React, {memo, useEffect, useState, VFC} from "react";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { auth } from "../../../firebase";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - アセット ============================================================================================================
import styles from "./Header.module.scss";

// - ルーティング =========================================================================================================
import { Routing } from "../../../router/routing";
import { useNavigate, Link } from "react-router-dom";

// - 補助関数 ============================================================================================================
import { isNotNull } from "../../../utils/isNotNull";


export const Header: VFC = memo(() => {

  const [ isLogin, setIsLogin ] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (isNotNull(user)) {
        setIsLogin(true);
      }
    })
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <Link to={Routing.top.path} className={styles.logo}>ロゴが入る</Link>
        </div>
        <div className={styles.right}>
          { isLogin ? (
            <div className={styles.link} onClick={logout}>ログアウト</div>
          ) : (
            <>
              <Link to={Routing.signIn.path} className={styles.link}>ログイン</Link>
              <Link to={Routing.signUp.path} className={styles.link}>会員登録</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
});
