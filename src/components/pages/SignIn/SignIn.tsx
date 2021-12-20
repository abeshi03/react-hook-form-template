// - ライブラリー ========================================================================================================
import React, { memo, VFC } from "react";

// - ルーディング ========================================================================================================
import { Routing } from "../../../router/routing";
import { Link } from "react-router-dom";

// - アセット ============================================================================================================
import styles from "./SignIn.module.scss";


// - 子コンポーネント =====================================================================================================
import { SignInControlGroup } from "../../organism/controlGroup/SignInControlGroup/SignInControlGroup";
import { GoogleSignInButton } from "../../atoms/Button/GoogleSignInButton/GoogleSignInButton";

export const SignIn: VFC = memo(() => {

  return (
    <div className={styles.signInPage}>
      <p>ログインページです</p>
      <SignInControlGroup/>
      <GoogleSignInButton/>
      <Link to={Routing.passwordReset.path}>パスワードを忘れた方はこちら</Link>
    </div>
  );
});
