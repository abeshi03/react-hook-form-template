// - ライブラリー ========================================================================================================
import React, { memo, useState, VFC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { displayFloatingNotificationBar } from "../../../features/floatingNotificationBar/floatingNotificationBarSlice";

// - ルーティング ========================================================================================================
import { useNavigate } from "react-router-dom";
import { Routing } from "../../../router/routing";

// - アセット ============================================================================================================
import styles from "./PasswordReset.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../atoms/InputField/InputField";
import { LoadingOverlay } from "../../atoms/LoadingOverlay/LoadingOverlay";

// - バリデーション =======================================================================================================
import { userValidations, emailErrorMessages } from "../../../config/validations/userValidations";

// - inputState ========================================================================================================
export type PasswordResetInputValue = {
  email: string
};
// - ===================================================================================================================


export const PasswordReset: VFC = memo(() => {

  const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetInputValue>();

  const [ isDisabled, setIsDisabled ] = useState(false);
  const [ isDisplayLoadingOverlay, setIsDisplayLoadingOverlay ] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSendPasswordResetEmail: SubmitHandler<PasswordResetInputValue> = (inputValue): void => {

    setIsDisabled(true);
    setIsDisplayLoadingOverlay(true);

    sendPasswordResetEmail(auth, inputValue.email)
      .then(() => {
        navigate(Routing.signIn.path);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "INFO",
            message: "メールを送信いたしました。"
          }
        }));
      })
      .catch((error: unknown) => {
        console.log(error);
        dispatch(displayFloatingNotificationBar({
          notification: {
            type: "ERROR",
            message: "登録されていないメールアドレスです"
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
      <div>パスワードリセット</div>
      <form className={styles.passwordResetForm} onSubmit={handleSubmit(onClickSendPasswordResetEmail)}>

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

        <button type="submit" disabled={isDisabled}>メールを送信する</button>
      </form>
      { isDisplayLoadingOverlay && <LoadingOverlay/> }
    </>
  );
});
