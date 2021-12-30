// - フレームワーク =======================================================================================================
import React, { memo, VFC } from "react";

// - アセット ============================================================================================================
import styles from "./PostAddingControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../atoms/InputField/InputField";


/* eslint-disable-next-line react/display-name */
export const PostAddingControlGroup: VFC = memo(() => {

  return (
    <form className={styles.PostAddingControlGroup}>
      {/*<InputField*/}
      {/*  type="text"*/}
      {/*  required="true"*/}
      {/*  label="投稿内容"*/}
      {/*  placeholder="投稿を入力してください"*/}
      {/*  inputProps={}*/}
      {/*  autoComplete="text"*/}
      {/*/>*/}
    </form>
  );
});
