// - フレームワーク =======================================================================================================
import React, { memo, VFC} from "react";
import { SignUpControlGroup } from "../../organism/controlGroup/SignUpControlGroup/SignUpControlGroup";

/* eslint-disable-next-line react/display-name */
export const SignUp: VFC = memo(() => {

  return (
    <>
      <h1>SignUpページです</h1>
      <SignUpControlGroup/>
    </>
  );
});
