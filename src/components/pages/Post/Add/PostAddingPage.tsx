// - フレームワーク =======================================================================================================
import React, { memo, useEffect, VFC } from "react";

// - グローバルstate =====================================================================================================
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { displayFloatingNotificationBar } from "../../../../features/floatingNotificationBar/floatingNotificationBarSlice";
import { RootState } from "../../../../store";

// - ルーティング ========================================================================================================
import { Routing } from "../../../../router/routing";
import { useNavigate } from "react-router-dom";

// - アセット ============================================================================================================
import styles from "./PostAddingPage.module.scss";

// -  子コンポーネント ====================================================================================================
import { PostAddingControlGroup } from "../../../organism/controlGroup/PostAddingControlGroup/PostAddingControlGroup";


export const PostAddingPage: VFC = memo(() => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin: boolean = useSelector((state: RootState) => state.authentication.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate(Routing.signIn.path, {
        state: { redirectPath: Routing.post.add.path }
      });
      dispatch(displayFloatingNotificationBar({
        notification: {
          type: "WARNING",
          message: "ログインしてください"
        }
      }));
    }
  })

  return (
    <main className={styles.PostAddingPage}>
      <h2>投稿ページです</h2>
      <PostAddingControlGroup/>
    </main>
  );
});
