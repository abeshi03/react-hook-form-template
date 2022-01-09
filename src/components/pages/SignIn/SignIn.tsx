// - ライブラリー ========================================================================================================
import React, { memo, useEffect, VFC } from "react";

// - ルーディング ========================================================================================================
import { Routing } from "../../../router/routing";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// - グローバルstate =====================================================================================================
import { useDispatch, useSelector } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";
import { RootState } from "../../../store";

// - アセット ============================================================================================================
import styles from "./SignIn.module.scss";


// - 子コンポーネント =====================================================================================================
import { SignInControlGroup } from "../../organism/controlGroup/SignInControlGroup/SignInControlGroup";
import { GoogleSignInButton } from "../../atoms/Button/GoogleSignInButton/GoogleSignInButton";

type CustomizedState = {
  redirectPath: string;
}

export const SignIn: VFC = memo(() => {

  const isLogin = useSelector((state: RootState) => state.authentication.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as CustomizedState;
  const redirectPath = locationState ? locationState.redirectPath : undefined;

  useEffect(() => {

    if (isLogin) {
      navigate(Routing.top.path);
      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "WARNING",
          message: "すでにログイン状態です"
        }
      }))
    }

  }, [ isLogin, dispatch, navigate ])

  return (
    <div className={styles.signInPage}>
      <p>ログインページです</p>
      <SignInControlGroup
        redirectPath={redirectPath}
      />
      <GoogleSignInButton/>
      <Link to={Routing.passwordReset.path}>パスワードを忘れた方はこちら</Link>
    </div>
  );
});
