// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./InputLabel.module.scss";

// - ルーティング =========================================================================================================

type Props = {
  label?: string;
  required: boolean;
}


export const InputLabel: VFC<Props> = memo((props) => {

  const { label, required } = props;

  return (
    <div className={styles.labelAndRequiredBadge}>
      {label && <label htmlFor={label} className={styles.label}>{label}</label>}
      {required && <span className={styles.requiredBadge}>必須</span>}
    </div>
  );
});
