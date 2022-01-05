// - ライブラリー ========================================================================================================
import React, { memo, useState, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// - ルーティング ========================================================================================================
import { Routing } from "../../../../router/routing";
import { useNavigate } from "react-router-dom";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - アセット ============================================================================================================
import styles from "./SignInControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../atoms/control/InputField/InputField";
import { LoadingOverlay } from "../../../atoms/LoadingOverlay/LoadingOverlay";

// - バリデーション =======================================================================================================
import {
  emailErrorMessages,
  passwordErrorMessages,
  userValidations
} from "../../../../config/validations/userValidations";

// - inputState ========================================================================================================
export type SignInInputValues = {
  email: string,
  password: string
};
// - ===================================================================================================================


export const SignInControlGroup: VFC = memo(() => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignInInputValues>();

  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isDisplayLoadingOverlay, setIsDisplayLoadingOverlay ] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const signIn: SubmitHandler<SignInInputValues> = (inputValue): void => {

    setIsDisabled(true);
    setIsDisplayLoadingOverlay(true);

    signInWithEmailAndPassword(auth, inputValue.email, inputValue.password)
      .then(() => {
        navigate(Routing.top.path);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "SUCCESS",
            message: "ログインしました！"
          }
        }));
      })
      .catch((error: unknown) => {
        console.log(error);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "ログインに失敗いたしました。メールアドレス、パスワードをご確認ください。"
          }
        }));
      })
      .finally(() => {
        setIsDisabled(false);
        setIsDisplayLoadingOverlay(false);
      })
  }

  return (
    <>
      <form className={styles.signInControlGroup} onSubmit={handleSubmit(signIn)}>

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

        <button type="submit" disabled={isDisabled}>ログイン</button>
      </form>

      { isDisplayLoadingOverlay && <LoadingOverlay/> }
    </>
  );
});
