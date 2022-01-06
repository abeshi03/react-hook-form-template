// - フレームワーク =======================================================================================================
import React, { memo, useEffect, VFC } from "react";

// - グローバルstate =====================================================================================================
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - ルーティング ========================================================================================================
import { Routing } from "../../../router/routing";
import { useNavigate } from "react-router-dom";

// - アセット ===========================================================================================================
import styles from "./SignUp.module.scss";

// - 子コンポーネント =====================================================================================================
import { SignUpControlGroup } from "../../organism/controlGroup/SignUpControlGroup/SignUpControlGroup";
import { GoogleSignInButton } from "../../atoms/Button/GoogleSignInButton/GoogleSignInButton";


export const SignUp: VFC = memo(() => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin: boolean = useSelector((state: RootState) => state.authentication.isLogin);

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
    <div className={styles.signUp}>
      <h1>SignUpページです</h1>
      <SignUpControlGroup/>
      <GoogleSignInButton/>
    </div>
  );
});
