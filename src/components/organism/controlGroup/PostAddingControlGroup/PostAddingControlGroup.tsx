// - フレームワーク =======================================================================================================
import React, { memo, useState, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// - アセット ============================================================================================================
import styles from "./PostAddingControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { Textarea } from "../../../molecules/control/Textarea/Textarea";
import { ImageUploader } from "../../../molecules/control/ImageUploader/ImageUploader";

// - バリデーション =======================================================================================================
import {
  postValidations,
  descriptionErrorMessage,
  imageErrorMessage
} from "../../../../config/validations/postValidations";

// - 画像ストレージ =======================================================================================================
import { imageUploadedStorage } from "../../../../config/imageUploadedStorage";


// - inputState ========================================================================================================
export type postInputValues = {
  description: string;
  image: File;
};
// - ===================================================================================================================


export const PostAddingControlGroup: VFC = memo(() => {

  const { register, handleSubmit, formState: { errors } } = useForm<postInputValues>();

  const [ isDisabled, setIsDisabled ] = useState(false);


  const postAdd: SubmitHandler<postInputValues> = (inputValue): void => {

    console.log("実装待機")
  }

  return (
    <form className={styles.postAddingControlGroup} onSubmit={handleSubmit(postAdd)}>
      <div className={styles.inputContainer}>
        <Textarea
          rows={10}
          required={postValidations.description.required}
          label="投稿内容"
          placeholder="投稿を入力してください"
          inputProps={register("description", {
            required: postValidations.description.required,
            minLength: postValidations.description.minLength,
            maxLength: postValidations.description.maxLength,
          })}
        />
        {errors.description && descriptionErrorMessage(errors.description)}
      </div>

      <div className={styles.inputContainer}>
        <ImageUploader
          label="画像"
          required={postValidations.image.required}
          accept={postValidations.image.accept}
          saveStorageDirectory={imageUploadedStorage.posts}
          supportedImagesFileExtensions={postValidations.image.supportedImagesFileExtensions}
          maximalImagesCount={postValidations.image.maximalImagesCount}
          inputProps={register("image", {
            required: postValidations.image.required
          })}
        />
        {errors.image && imageErrorMessage(errors.image)}
      </div>

      <button type="submit" disabled={isDisabled}>ログイン</button>
    </form>
  );
});
