// - フレームワーク =======================================================================================================
import React, { memo, useContext, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./LoadingOverlay.module.scss";

// - グローバルstate =====================================================================================================
import { LoadingOverlayContext, LoadingOverlayContextType } from "../../../providers/LoadingOverlayProvider ";

/* eslint-disable-next-line react/display-name */
export const LoadingOverlay: VFC = memo(() => {

  const { displayLoadingOverlay } = useContext<LoadingOverlayContextType>(LoadingOverlayContext)

  return (
    <>
      { displayLoadingOverlay &&
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingOverlay__loadingIndicator}></div>
        </div>
      }
    </>
  );
});
