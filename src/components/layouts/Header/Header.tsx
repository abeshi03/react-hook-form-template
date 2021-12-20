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
          <Link to={Routing.top.path} className={styles.logo}>ロゴが入る</Link>
        </div>
        <div className={styles.right}>
          <Link to={Routing.signIn.path} className={styles.link}>ログイン</Link>
          <Link to={Routing.signUp.path} className={styles.link}>会員登録</Link>
          <div className={styles.link}>ログアウト</div>
        </div>
      </div>
    </header>
  );
});
