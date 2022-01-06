// - フレームワーク, ライブラリー ===========================================================================================
import React, { memo, VFC } from "react";


// - アセット ============================================================================================================
import styles from "./InputField.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";

type InputFiledType = "text" | "password" | "email";

type Props = {
  label?: string;
  placeholder?: string;
  type: InputFiledType;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}


export const InputField: VFC<Props> = memo((props) => {

  const {
    label,
    placeholder,
    type,
    required,
    guidance,
    disabled = false,
    defaultValue,
    autoComplete,
    inputProps
  } = props;

  return (
    <div className={styles.inputFieldContainer}>

      <InputLabel
        required={required}
        label={label}
      />

      <input
        { ...inputProps }
        className={styles.inputField}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
