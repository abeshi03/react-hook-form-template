// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./ImageUploader.module.scss";

type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  inputProps: React.HTMLAttributes<EventTarget>;
}

export const ImageUploader: VFC<Props> = memo((props) => {

  const {
    label,
    required,
    guidance,
    disabled,
    defaultValue,
    inputProps
  } = props;

  return (
    <div className={styles.imageUploaderContainer}>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>
      <input
        { ...inputProps }
        className={styles.imageUploader}
        type="file"
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
