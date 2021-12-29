// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./PostAddingPage.module.scss";

// -  子コンポーネント ====================================================================================================
import { PostAddingControlGroup } from "../../../organism/controlGroup/PostAddingControlGroup/PostAddingControlGroup";

/* eslint-disable-next-line react/display-name */
export const PostAddingPage: VFC = memo(() => {

  return (
    <main className={styles.PostAddingPage}>
      <PostAddingControlGroup/>
    </main>
  );
});
