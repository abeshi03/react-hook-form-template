// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./LoadingOverlay.module.scss";

// - ルーティング =========================================================================================================

/* eslint-disable-next-line react/display-name */
export const LoadingOverlay: VFC = memo((props) => {

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingOverlay__loadingIndicator}></div>
    </div>
  );
});
