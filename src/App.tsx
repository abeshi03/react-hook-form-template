// - フレームワーク =======================================================================================================
import React, { VFC } from 'react';

// - ルーティング ========================================================================================================
import { Routing } from "./router/routing";
import { Link } from "react-router-dom";

const App: VFC = () => {

  return (
    <>
      <div>トップページです</div>
      <Link to={Routing.signUp.path}>会員登録</Link>
    </>
  );
}

export default App;
