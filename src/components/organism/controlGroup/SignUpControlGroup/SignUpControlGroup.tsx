// - フレームワーク =======================================================================================================
import React, {memo, VFC} from "react";
import {SubmitHandler, useForm, FormProvider} from "react-hook-form";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../../firebase";


// - 子供コンポーネント ====================================================================================================
import {InputField} from "../../../atoms/InputField/InputField";

export type SignUpInputs = {
  email: string,
  password: string,
};

const registerValue: SignUpInputs = {
  email: "email",
  password: "password"
}


/* eslint-disable-next-line react/display-name */
export const SignUpControlGroup: VFC = memo(() => {

  // const { register, handleSubmit, formState: { errors } } = useForm<SignUpInputs>();
  const methods = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = data => console.log(data);

  // const onSubmit: SubmitHandler<SignUpInputs > = (data) => {
  //   try {
  //     createUserWithEmailAndPassword(auth, data.email, data.password).then(() => console.log("成功"));
  //   } catch (error: unknown) {
  //     console.log("失敗しました")
  //   }
  // }

  return (
    <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          type="text"
          required
          name={registerValue.email}
        />
        <InputField
          type="text"
          required={true}
          name={registerValue.password}
          maxLength={6}
        />
        {methods.formState.errors.password && methods.formState.errors.password.type === "required" &&
        <span>パスワードは必須です</span> }

        <button type="submit">送信</button>
      </form>
    </FormProvider>
  );
});
