// - フレームワーク =======================================================================================================
import React, { VFC } from 'react';
import { Link } from "react-router-dom";

const App: VFC = () => {

  return (
    <>
      <div>トップページです</div>
      <Link to="/sign_up">会員登録</Link>
    </>
  );
}

export default App;
