// - フレームワーク =======================================================================================================
import React, { memo, useState, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// - アセット ============================================================================================================
import styles from "./PostAddingControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { Textarea } from "../../../atoms/Textarea/Textarea";

// - バリデーション =======================================================================================================
import { postValidations, descriptionErrorMessage } from "../../../../config/validations/postValidations";


// - inputState ========================================================================================================
export type postInputValues = {
  description: string;
};
// - ===================================================================================================================

/* eslint-disable-next-line react/display-name */
export const PostAddingControlGroup: VFC = memo(() => {

  const { register, handleSubmit, formState: { errors } } = useForm<postInputValues>();

  const [ isDisabled, setIsDisabled ] = useState(false);


  const postAdd: SubmitHandler<postInputValues> = (inputValue): void => {

    setIsDisabled(true);

  }

  return (
    <form className={styles.PostAddingControlGroup} onSubmit={handleSubmit(postAdd)}>
      <Textarea
        rows={10}
        required={postValidations.description.required}
        label="投稿内容"
        placeholder="投稿を入力してください"
        inputProps={register("description", {
          required: postValidations.description.required,
          minLength: postValidations.description.minLength,
          maxLength: postValidations.description.maxLength
        })}
      />
      {errors.description && descriptionErrorMessage(errors.description)}

      <button type="submit" disabled={isDisabled}>ログイン</button>
    </form>
  );
});
