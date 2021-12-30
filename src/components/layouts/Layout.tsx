// - フレームワーク =======================================================================================================
import React, {memo, useEffect, VFC} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";

// - 子コンポーネント =====================================================================================================
import { Header } from "./Header/Header";
import { FloatingNotificationBar } from "../../features/floatingNotificationBar/FloatingNotificationBar";

// - グローバルstate =====================================================================================================
import { setIsLogin } from "../../features/authenticationSlice";
import { isNotNull } from "../../utils/isNotNull";


export const Layout: VFC = memo(() => {

  const dispatch = useDispatch();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setIsLogin({
        isLogin: isNotNull(user)
      }))
    })
  }, [ dispatch ])

  return (
    <>
      <Header/>
      <FloatingNotificationBar/>
    </>
  );
});
