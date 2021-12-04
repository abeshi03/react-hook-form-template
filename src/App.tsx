import React, {ChangeEvent, FormEvent, useState, VFC} from 'react';
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const App: VFC = () => {

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
    <form className="App" onSubmit={handleSubmit}>
      <p>メールアドレス</p>
      <input
        type="text"
        value={email}
        onChange={onChangeEmail}
      />
      <p>パスワード</p>
      <input
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <button type="submit">会員登録</button>
    </form>
  );
}

export default App;
