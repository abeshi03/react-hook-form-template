// - ライブラリー ========================================================================================================
import React, { memo, VFC } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import {SubmitHandler, useForm, FormProvider, FieldError} from "react-hook-form";

// - アセット ===========================================================================================================
import styles from "./SignUpControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../atoms/InputField/InputField";

// - バリデーション =======================================================================================================
import { signUpValidations } from "../../../../config/validations/signUpValidations";


// - inputState ========================================================================================================
export type SignUpInputValues = {
  email: string,
  password: string,
};

const signUpInputValue: SignUpInputValues = {
  email: "email",
  password: "password"
}
// - ===================================================================================================================


// - エラーメッセージ =====================================================================================================
const emailErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required": return <span className="errorMessage">メールアドレスは必須です</span>;
    case "pattern": return <span className="errorMessage">不正なメールアドレスです。(正しい例: example@example.com)</span>;
  }
}

const passwordErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <span className="errorMessage">パスワードは必須です</span>;

    case "minLength": return <span className="errorMessage">
      {`パスワードは${signUpValidations.password.minLength}〜${signUpValidations.password.maxLength}文字で入力してください`}
    </span>;

    case "maxLength": return <span className="errorMessage">
      {`パスワードは${signUpValidations.password.minLength}〜${signUpValidations.password.maxLength}文字で入力してください`}
    </span>
  }
}
// - ===================================================================================================================

/* eslint-disable-next-line react/display-name */
export const SignUpControlGroup: VFC = memo(() => {

  const methods = useForm<SignUpInputValues>();

  const onSubmit: SubmitHandler<SignUpInputValues> = (inputValue) => {
    try {
      createUserWithEmailAndPassword(auth, inputValue.email, inputValue.password).then(() => console.log("成功"));
    } catch (error: unknown) {
      console.log("失敗しました")
    }
  }

  return (
    <FormProvider { ...methods }>
      <form className={styles.signInControlGroup} onSubmit={methods.handleSubmit(onSubmit)}>

        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required={signUpValidations.email.required}
            inputValue={signUpInputValue.email}
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
            pattern={signUpValidations.email.regexp}
          />
          {methods.formState.errors.email && emailErrorMessages(methods.formState.errors.email)}
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required={signUpValidations.password.required}
            inputValue={signUpInputValue.password}
            minLength={signUpValidations.password.minLength}
            maxLength={signUpValidations.password.maxLength}
            label="パスワード"
            guidance="※パスワードは最低6文字以上で入力してください"
            placeholder="パスワードを入力してください"
          />
          {methods.formState.errors.password && passwordErrorMessages(methods.formState.errors.password)}
        </div>

        <button type="submit">送信</button>
      </form>
    </FormProvider>
  );
});
