// - ライブラリー ========================================================================================================
import React, { memo, VFC, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { SubmitHandler, useForm } from "react-hook-form";

// - アセット ===========================================================================================================
import styles from "./SignUpControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../atoms/InputField/InputField";
import { LoadingOverlay } from "../../../atoms/LoadingOverlay/LoadingOverlay";
import { FloatingNotificationBar } from "../../../molecules/FloatingNotificationBar/FloatingNotificationBar";

// - バリデーション =======================================================================================================
import { signUpValidations } from "../../../../config/validations/signUpValidations";
import { emailErrorMessages } from "../../../../config/validations/signUpValidations";
import { passwordErrorMessages } from "../../../../config/validations/signUpValidations";

// - inputState ========================================================================================================
export type SignUpInputValues = {
  email: string,
  password: string
};
// - ===================================================================================================================


export const SignUpControlGroup: VFC = memo(() => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputValues>();

  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isDisplayLoadingOverlay, setIsDisplayLoadingOverlay ] = useState(false);
  const [ isDisplayFlashMessage, setIsDisplayFlashMessage ] = useState(false);

  const onSubmit: SubmitHandler<SignUpInputValues> = (inputValue) => {

    setIsDisabled(true);
    setIsDisplayLoadingOverlay(true);

    createUserWithEmailAndPassword(auth, inputValue.email, inputValue.password)
      .then(() => setIsDisplayFlashMessage(true))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsDisabled(false);
        setIsDisplayLoadingOverlay(false);
      })
  }

  const hiddenFlashMessage = (): void => {
    setIsDisplayFlashMessage(false);
  }


  return (
    <>
      <form className={styles.signInControlGroup} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required={signUpValidations.email.required}
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            inputProps={register("email",{
              required: signUpValidations.email.required,
              pattern: signUpValidations.email.regexp
            })}
            autoComplete="email"
          />
          {errors.email && emailErrorMessages(errors.email)}
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="password"
            required={signUpValidations.password.required}
            label="パスワード"
            guidance={`※パスワードは最低${signUpValidations.password.minLength}文字以上で入力してください`}
            placeholder="パスワードを入力してください"
            inputProps={register("password", {
              required: signUpValidations.password.required,
              minLength: signUpValidations.password.minLength,
              maxLength: signUpValidations.password.maxLength
            })}
            autoComplete="new-password"
          />
          {errors.password && passwordErrorMessages(errors.password)}
        </div>

        <button type="submit" disabled={isDisabled}>送信</button>

      </form>

      { isDisplayLoadingOverlay && <LoadingOverlay /> }
      { isDisplayFlashMessage && <FloatingNotificationBar type="SUCCESS" message="ログインに成功しました！" closeFunction={hiddenFlashMessage} /> }
    </>
  );
});
