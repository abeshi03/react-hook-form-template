// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./LoadingOverlay.module.scss";

type Props = {
  isLoadingOverlay: boolean;
}

const displayLoadingOverlay = (displayFlag: boolean) => {
  if (displayFlag) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingOverlay__loadingIndicator}></div>
      </div>
    )
  }
}

/* eslint-disable-next-line react/display-name */
export const LoadingOverlay: VFC<Props> = memo(({ isLoadingOverlay }) => {

  return (
    <>
      {displayLoadingOverlay(isLoadingOverlay)}
    </>
  );
});
