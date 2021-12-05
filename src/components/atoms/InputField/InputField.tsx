// - フレームワーク, ライブラリー ===========================================================================================
import React, { memo, VFC } from "react";
import { useFormContext } from "react-hook-form";


// - アセット ============================================================================================================
import styles from"./InputField.module.scss";

type InputFiledType = "text" | "password";

type Props = {
  label?: string;
  placeholder?: string;
  type: InputFiledType;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  inputValue: string;
  maxLength?: number;
  minLength?: number;
  defaultValue?: string;
}

/* eslint-disable-next-line react/display-name */
export const InputField: VFC<Props> = memo((props) => {

  const {
    label,
    placeholder,
    type,
    required,
    guidance,
    disabled = false,
    inputValue,
    maxLength,
    minLength,
    defaultValue
  } = props;

  const { register } = useFormContext();

  return (
    <div className={styles.inputFieldContainer}>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>
      <input
        className={styles.inputField}
        defaultValue={defaultValue && defaultValue}
        type={type}
        placeholder={placeholder && placeholder}
        disabled={disabled}
        {...register(`${inputValue}`, {
          required: required,
          maxLength: maxLength && maxLength,
          minLength: minLength && minLength
        })}
      />
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
