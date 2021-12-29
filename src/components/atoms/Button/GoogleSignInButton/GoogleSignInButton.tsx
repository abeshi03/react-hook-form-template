// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";
import { auth } from "../../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// - ルーティング ========================================================================================================
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../router/routing";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../../features/floatingNotificationBar/floatingNotificationBarSlice";
import { setIsLogin } from "../../../../features/authenticationSlice";


export const GoogleSignInButton: VFC = memo(() => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provider: GoogleAuthProvider = new GoogleAuthProvider();

  const onClickGoogleSignIn = (): void => {
    signInWithPopup(auth, provider)
      .then(() => {

        dispatch(setIsLogin({
          isLogin: true
        }));

        navigate(Routing.top.path);

        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "SUCCESS",
            message: "ログインしました"
          }
        }))
      })
      .catch((error: unknown) => {
        console.log(error);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "Googleログインに失敗いたしました"
          }
        }))
      })
  }

  return (
    <button onClick={onClickGoogleSignIn}>Googleログイン</button>
  );
});
