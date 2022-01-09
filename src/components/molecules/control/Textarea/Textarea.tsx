// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./Textarea.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";


type Props = {
  label?: string;
  placeholder?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  rows?: number;
  cols?: number;
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
    rows,
    cols,
    inputProps
  } = props;

  return (
    <div className={styles.textareaContainer}>

      <InputLabel
        required={required}
        label={label}
      />

      <textarea
        { ...inputProps }
        className={styles.textarea}
        rows={rows}
        cols={cols}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
