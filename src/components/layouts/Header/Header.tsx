// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./Header.module.scss";

// - ルーティング =========================================================================================================
import { Routing } from "../../../router/routing";
import { Link } from "react-router-dom";


export const Header: VFC = memo(() => {


  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <div className={styles.logo}>ロゴが入る</div>
        </div>
        <div className={styles.right}>
          <Link to={Routing.signIn.path}>ログイン</Link>
          <Link to={Routing.signUp.path}>会員登録</Link>
          <div className={styles.logout}>ログアウト</div>
        </div>
      </div>
    </header>
  );
});
