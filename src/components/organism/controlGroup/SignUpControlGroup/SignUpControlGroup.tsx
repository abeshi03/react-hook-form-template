// - ライブラリー ========================================================================================================
import React, { memo, VFC } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import {SubmitHandler, useForm, FormProvider, FieldError} from "react-hook-form";

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
    case "required": return <span>メールアドレスは必須です</span>;
  }
}

const passwordErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required": return <span>パスワードは必須です</span>;
    case "minLength": return <span>パスワードは6文字以上で入力してください</span>;
    case "maxLength": return <span>パスワードは10文字以内で入力してください</span>
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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          type="text"
          required
          inputValue={signUpInputValue.email}
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
        />
        {methods.formState.errors.email && emailErrorMessages(methods.formState.errors.email)}

        <InputField
          type="text"
          required
          inputValue={signUpInputValue.password}
          maxLength={6}
          label="パスワード"
          guidance="※パスワードは最低6文字以上で入力してください"
          placeholder="パスワードは最低6文字以上で入力してください"
        />
        {methods.formState.errors.password && passwordErrorMessages(methods.formState.errors.password)}

        <button type="submit">送信</button>
      </form>
    </FormProvider>
  );
});
