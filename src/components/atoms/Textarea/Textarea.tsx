// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./Textarea.module.scss";


type Props = {
  label?: string;
  placeholder?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  inputProps: React.HTMLAttributes<HTMLTextAreaElement>;
}

export const Textarea: VFC<Props> = memo((props) => {

  const {
    label,
    placeholder,
    required,
    guidance,
    disabled = false,
    defaultValue,
    autoComplete,
    inputProps
  } = props;

  return (
    <div className={styles.textareaContainer}>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>
      <textarea
        { ...inputProps }
        className={styles.inputField}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
