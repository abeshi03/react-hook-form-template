// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - 子コンポーネント =====================================================================================================
import { Header } from "./Header/Header";
import { FloatingNotificationBar } from "../../features/floatingNotificationBar/FloatingNotificationBar";


export const Layout: VFC = memo(() => {

  return (
    <>
      <Header/>
      <FloatingNotificationBar/>
    </>
  );
});
