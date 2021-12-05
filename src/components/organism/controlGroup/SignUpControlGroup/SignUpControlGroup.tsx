// - ライブラリー ========================================================================================================
import React, { memo, VFC } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import {SubmitHandler, useForm, FormProvider, FieldError} from "react-hook-form";

// - アセット ===========================================================================================================
import styles from "./SignUpControlGroup.module.scss";

// - 子コンポーネント =====================================================================================================
import { InputField } from "../../../atoms/InputField/InputField";


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
  }
}

const passwordErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required": return <span className="errorMessage">パスワードは必須です</span>;
    case "minLength": return <span className="errorMessage">パスワードは6文字以上で入力してください</span>;
    case "maxLength": return <span className="errorMessage">パスワードは10文字以内で入力してください</span>
  }
}
// - ===================================================================================================================

/* eslint-disable-next-line react/display-name */
export const SignUpControlGroup: VFC = memo(() => {

  const methods = useForm<SignUpInputValues>();

  const onSubmit: SubmitHandler<SignUpInputValues> = (data) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(() => console.log("成功"));
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
            required
            inputValue={signUpInputValue.email}
            label="メールアドレス"
            placeholder="メールアドレスを入力してください"
          />
          {methods.formState.errors.email && emailErrorMessages(methods.formState.errors.email)}
        </div>

        <div className={styles.inputContainer}>
          <InputField
            type="text"
            required
            inputValue={signUpInputValue.password}
            minLength={6}
            maxLength={10}
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
