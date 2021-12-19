// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./FloatingNotificationBar.module.scss";
import { ErrorIcon } from "../../../assets/icons/ErrorIcon";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import { WarningIcon } from "../../../assets/icons/WarningIcon";
import { SuccessIcon } from "../../../assets/icons/SuccessIcon";

// - 型定義 =============================================================================================================
import { AlertType } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";


type Props = {
  type: AlertType;
  message: string;
  closeFunction?: () => void;
}

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


export const FloatingNotificationBar: VFC<Props> = memo((props) => {
  const { type, message, closeFunction } = props;

  return (
    <>
      <div className={`${styles.floatingNotificationBar} ${variationModifierCSS_Class(type)}`}>
        <div className={styles.icon}>
          { getIcon(type) }
        </div>
        <p className={styles.message}>{ message }</p>
        <div
          className={styles.closeButton}
          role="button"
          onClick={closeFunction}
        >{'×'}</div>
      </div>
    </>
  );
});
