// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./PostAddingPage.module.scss";

// -  子コンポーネント ====================================================================================================
import { PostAddingControlGroup } from "../../../organism/controlGroup/PostAddingControlGroup/PostAddingControlGroup";


export const PostAddingPage: VFC = memo(() => {

  return (
    <main className={styles.PostAddingPage}>
      <h2>投稿ページです</h2>
      <PostAddingControlGroup/>
    </main>
  );
});
