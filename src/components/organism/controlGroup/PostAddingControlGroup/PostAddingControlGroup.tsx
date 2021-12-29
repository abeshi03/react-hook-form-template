// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./PostAddingControlGroup.module.scss";
// - ルーティング =========================================================================================================

/* eslint-disable-next-line react/display-name */
export const PostAddingControlGroup: VFC = memo(() => {

  return (
    <div className={styles.PostAddingControlGroup}>テスト</div>
  );
});
