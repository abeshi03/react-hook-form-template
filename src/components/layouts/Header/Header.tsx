// - ライブラリー ========================================================================================================
import React, { memo, VFC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

// - グローバルstate =====================================================================================================
import { useDispatch, useSelector } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";
import { setIsLogin } from "../../../features/authenticationSlice";
import { RootState } from "../../../store";

// - アセット ============================================================================================================
import styles from "./Header.module.scss";

// - ルーティング =========================================================================================================
import { Routing } from "../../../router/routing";
import { useNavigate, Link } from "react-router-dom";


export const Header: VFC = memo(() => {

  const globalState = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = (): void => {

    signOut(auth)
      .then(() => {

        dispatch(setIsLogin({
          isLogin: false
        }));

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
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <Link to={Routing.top.path} className={styles.logo}>ロゴが入る</Link>
        </div>
        <div className={styles.right}>
          { globalState.isLogin ? (
            <div className={styles.link} onClick={logout} role="link">ログアウト</div>
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
