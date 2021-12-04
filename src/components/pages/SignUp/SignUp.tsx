// - フレームワーク =======================================================================================================
import React, {ChangeEvent, FormEvent, memo, useState, VFC} from "react";

// - アセット ===========================================================================================================
import styles from "./SignUp.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { InputField } from "../../atoms/InputField/InputField";

/* eslint-disable-next-line react/display-name */
export const SignUp: VFC = memo(() => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(() => { console.log("成功")})
  }

  return (
    <>
      <h1>SignUpページです</h1>
      <form className="App" onSubmit={handleSubmit}>
        <InputField
          type="text"
          value={email}
          onChangeFunction={onChangeEmail}
          label="メールアドレス"
          externalLabelHTML_ID="email"
        />
        <p>パスワード</p>
        <input
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <button type="submit">会員登録</button>
      </form>
    </>
  );
});
