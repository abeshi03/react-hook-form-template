// - ライブラリ ==========================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./SelectField.module.scss";

// - ルーティング =========================================================================================================

export type SelectFieldType = {
  readonly key: string;
  readonly label: string;
  readonly initiallySelected?: boolean;
}

type Props = {
  label?: string;
  required: boolean;
  guidance?: string;
  disabled?: boolean;
  selectOptions: SelectFieldType[];
  emptySelect?: boolean;
  emptySelectString?: string;
  inputProps: React.HTMLAttributes<HTMLSelectElement>;
}

/* eslint-disable-next-line react/display-name */
export const SelectField: VFC<Props> = memo((props) => {

  const {
    label,
    required,
    guidance,
    disabled,
    selectOptions,
    emptySelect = false,
    emptySelectString,
    inputProps
  } = props;

  return (
    <div className={styles.selectFieldContainer}>
      <div className={styles.labelAndRequiredBadge}>
        {label && <label htmlFor={label} className={styles.label}>{label}</label>}
        {required && <span className={styles.requiredBadge}>必須</span>}
      </div>

      <select
        { ...inputProps }
        className={styles.selectField}
        disabled={disabled}
      >
        {emptySelect && <option value="">{ emptySelectString ? emptySelectString : "未選択" }</option>}
        {selectOptions.map((selectOption: SelectFieldType) => (
          <option
            key={selectOption.key}
            value={selectOption.key}
          >{selectOption.label}</option>
        ))}
      </select>
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </div>
  );
});
