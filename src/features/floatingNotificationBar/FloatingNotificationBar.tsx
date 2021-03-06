// - ライブラリー ========================================================================================================
import React, { memo, useEffect, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./FloatingNotificationBar.module.scss";
import { ErrorIcon } from "../../assets/icons/ErrorIcon";
import { InfoIcon } from "../../assets/icons/InfoIcon";
import { WarningIcon } from "../../assets/icons/WarningIcon";
import { SuccessIcon } from "../../assets/icons/SuccessIcon";

// - 型定義 =============================================================================================================
import { AlertType } from "./floatingNotificationBarSlice";

// - グローバルstate =====================================================================================================
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { hiddenFloatingNotificationBar } from "./floatingNotificationBarSlice";


const variationModifierCSS_Class = (type: AlertType): string => {
  switch (type) {
    case "ERROR": return styles.floatingNotificationBar__error;
    case "WARNING": return styles.floatingNotificationBar__warning;
    case "INFO" : return styles.floatingNotificationBar__info;
    case "SUCCESS" : return styles.floatingNotificationBar__success;
  }
}


const getIcon = (type: AlertType): JSX.Element => {
  switch (type) {
    case "ERROR": return <ErrorIcon/>;
    case "WARNING": return <WarningIcon/>;
    case "INFO" : return <InfoIcon/>;
    case "SUCCESS" : return  <SuccessIcon/>;
  }
}


export const FloatingNotificationBar: VFC = memo(() => {

  const state = useSelector((state: RootState) => state.floatingNotificationBar);
  const dispatch = useDispatch();

  useEffect(() => {

    // - FloatingNotificationBarが表示されている場合、3秒後に非表示にする
    if (state.notification) {
      const hiddenTimer = setTimeout(() => {
        dispatch(hiddenFloatingNotificationBar());
      }, 5000)

      return () => {
        clearTimeout(hiddenTimer);
      }
    }
  }, [ dispatch, state.notification ])

  return (
    <>
      {state.notification &&
        <div className={`${styles.floatingNotificationBar} ${variationModifierCSS_Class(state.notification.type)}`}>
          <div className={styles.icon}>
            { getIcon(state.notification.type) }
          </div>
          <p className={styles.message}>{ state.notification.message }</p>
          <div
            className={styles.closeButton}
            role="button"
            onClick={() => dispatch(hiddenFloatingNotificationBar())}
          >{'×'}</div>
        </div>
      }
    </>
  );
});
