// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./InputLabel.module.scss";

// - ルーティング =========================================================================================================

type Props = {
  label?: string;
  required: boolean;
  style?: React.CSSProperties;
}


export const InputLabel: VFC<Props> = memo((props) => {

  const { label, required, style } = props;

  return (
    <div className={styles.labelAndRequiredBadge} style={style}>
      {label && <label htmlFor={label} className={styles.label}>{label}</label>}
      {required && <span className={styles.requiredBadge}>必須</span>}
    </div>
  );
});
