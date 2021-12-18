// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./LoadingOverlay.module.scss";


export const LoadingOverlay: VFC = memo(() => {

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingOverlay__loadingIndicator}></div>
    </div>
  );
});
