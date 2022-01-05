// - フレームワーク =======================================================================================================
import React, { VFC } from 'react';
import { Link } from "react-router-dom";
import { Routing } from "./router/routing";


const App: VFC = () => {

  return (
    <>
      <div>トップページです</div>
      <Link to={Routing.post.add.path}>投稿ページ</Link>
    </>
  );
}

export default App;
