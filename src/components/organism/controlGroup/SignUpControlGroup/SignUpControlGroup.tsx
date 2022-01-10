// - ライブラリー ========================================================================================================
import React, { memo, VFC, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - ルーティング ========================================================================================================
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../../router/routing";

// - アセット ===========================================================================================================
import styles from "./SignUpControlGroup.module.scss";
import { formatterStrings } from "../../../../config/formatterStrings";
import { selectCustomTheme } from "../../../../assets/styles/reactSelect";
import { selectCustomStyles } from "../../../../assets/styles/reactSelect";

// - 型定義 =============================================================================================================
import { Genders } from "../../../../types/User";
import SelectField from "../../../../types/ReactSelect";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../molecules/control/InputField/InputField";
import { LoadingOverlay } from "../../../atoms/LoadingOverlay/LoadingOverlay";
import { ImageUploader } from "../../../molecules/control/ImageUploader/ImageUploader";
import { InputLabel } from "../../../atoms/InputLabel/InputLabel";

// - バリデーション =======================================================================================================
import {
  userValidations,
  emailErrorMessages,
  passwordErrorMessages,
  userNameErrorMessages,
  genderErrorMessages
} from "../../../../config/validations/userValidations";

// - ストレージ ==========================================================================================================
import { imageUploadedStorage } from "../../../../config/imageUploadedStorage";


// - inputState ========================================================================================================
export type SignUpInputValues = {
  email: string;
  password: string;
  userName: string;
  avatarImageURI?: string;
  gender: Genders;
};


// - セレクトフィールド ===================================================================================================
const getGendersSelectOptions = (): SelectField.Option[] => {
  const genders = Object.values(Genders);
  return genders.map((gender: Genders): SelectField.Option => ({
    label: formatterStrings.gender(gender),
    value: gender
  }))
}


export const SignUpControlGroup: VFC = memo(() => {

  const { register, handleSubmit, control, formState: { errors } } = useForm<SignUpInputValues>();

  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isDisplayLoadingOverlay, setIsDisplayLoadingOverlay ] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const signUp: SubmitHandler<SignUpInputValues> = (inputValue) => {

    setIsDisabled(true);
    setIsDisplayLoadingOverlay(true);

    createUserWithEmailAndPassword(auth, inputValue.email, inputValue.password)
      .then(() => {
        navigate(Routing.top.path);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "SUCCESS",
            message: "会員登録が完了いたしました！"
          }
        }))
      })
      .catch((error) => {
        console.error(error.code, error.message);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "登録されているメールアドレスです"
          }
        }))
      })
      .finally(() => {
        setIsDisabled(false);
        setIsDisplayLoadingOverlay(false);
      })
  }


  return (
    <>
      <form className={styles.signInControlGroup} onSubmit={handleSubmit(signUp)}>

        <div className={styles.inputContainer}>
          <InputField
            type="email"
            required={userValidations.email.required}
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            inputProps={register("email",{
              required: userValidations.email.required,
              pattern: userValidations.email.regexp
            })}
            autoComplete="email"
          />
          {errors.email && emailErrorMessages(errors.email)}
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="password"
            required={userValidations.password.required}
            label="パスワード"
            guidance={`※パスワードは最低${userValidations.password.minLength}文字以上で入力してください`}
            placeholder="パスワードを入力してください"
            inputProps={register("password", {
              required: userValidations.password.required,
              minLength: userValidations.password.minLength,
              maxLength: userValidations.password.maxLength
            })}
            autoComplete="new-password"
          />
          {errors.password && passwordErrorMessages(errors.password)}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel
            required={userValidations.gender.required}
            label="性別"
            style={{marginBottom: "10px"}}
          />
          <Controller
            control={control}
            name="gender"
            rules={{ required: userValidations.gender.required }}
            render={({ field: { onChange, onBlur, ref } }) => (
              <Select
                placeholder="性別を選択"
                options={getGendersSelectOptions()}
                theme={selectCustomTheme}
                styles={selectCustomStyles}
                onBlur={onBlur}
                ref={ref}
                onChange={onChange}
              />
            )}
          />
          {errors.gender && genderErrorMessages(errors.gender)}
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required={userValidations.userName.required}
            label="ユーザー名"
            placeholder="ユーザー名を入力してください"
            inputProps={register("userName",{
              required: userValidations.userName.required,
              minLength: userValidations.userName.minLength,
              maxLength: userValidations.userName.maxLength
            })}
            autoComplete="text"
          />
          {errors.userName && userNameErrorMessages(errors.userName)}
        </div>

        <div className={styles.inputContainer}>
          <ImageUploader
            label="アバター画像"
            required={userValidations.avatarImage.required}
            supportedImagesFileExtensions={userValidations.avatarImage.supportedImagesFileExtensions}
            saveStorageDirectory={imageUploadedStorage.user.avatar}
            maximalImagesCount={userValidations.avatarImage.maximalImagesCount}
            inputProps={register("avatarImageURI", {
              required: userValidations.avatarImage.required
            })}
          />
        </div>

        <button type="submit" disabled={isDisabled}>送信</button>

      </form>

      { isDisplayLoadingOverlay && <LoadingOverlay /> }
    </>
  );
});
