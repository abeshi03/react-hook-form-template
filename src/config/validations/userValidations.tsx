// - ライブラリー ========================================================================================================
import React from "react";
import { FieldError } from "react-hook-form";

// - バリデーション =======================================================================================================
export const userValidations = {

  email: {
    required: true,
    regexp: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  },

  password: {
    required: true,
    minLength: 6,
    maxLength: 36
  }
};


// - エラーメッセージ =====================================================================================================
export const emailErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required": return <span className="errorMessage">メールアドレスは必須です</span>;
    case "pattern": return <span className="errorMessage">不正なメールアドレスです。(正しい例: example@example.com)</span>;
  }
};

export const passwordErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <span className="errorMessage">パスワードは必須です</span>;

    case "minLength": return <span className="errorMessage">
      {`パスワードは${userValidations.password.minLength}〜${userValidations.password.maxLength}文字で入力してください`}
      </span>;

    case "maxLength": return <span className="errorMessage">
        {`パスワードは${userValidations.password.minLength}〜${userValidations.password.maxLength}文字で入力してください`}
      </span>
  }
};

