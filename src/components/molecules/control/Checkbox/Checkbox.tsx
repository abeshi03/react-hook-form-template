// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./Checkbox.module.scss"


type Props = {
  label: string;
  id: string;
  required: boolean;
  guidance?: string;
  defaultChecked?: boolean;
  inputProps: React.HTMLAttributes<HTMLInputElement>;
}

/* eslint-disable-next-line react/display-name */
export const Checkbox: VFC<Props> = memo((props) => {

  const {
    label,
    id,
    guidance,
    defaultChecked = false,
    inputProps,
  } = props;


  return (
    <>
      <div className={styles.container}>
        <input
          type="checkbox"
          id={id}
          defaultChecked={defaultChecked}
          { ...inputProps }
        />
        <label htmlFor={id}>{ label }</label>
      </div>
      {guidance && <p className={styles.guidance}>{guidance}</p>}
    </>
  );
});
