// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";
// - アセット ============================================================================================================
import styles from "./SignIn.module.scss";

// - 子コンポーネント =====================================================================================================
import { SignInControlGroup } from "../../organism/controlGroup/SignInControlGroup/SignInControlGroup";

export const SignIn: VFC = memo(() => {

  return (
    <div className={styles.signInPage}>
      <p>ログインページです</p>
      <SignInControlGroup/>
    </div>
  );
});
