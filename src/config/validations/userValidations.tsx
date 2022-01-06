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
  },

  userName: {
    required: true,
    minLength: 1,
    maxLength: 30
  },

  avatarImage: {
    required: false,
    accept: ".png, .jpeg",
    supportedImagesFileExtensions: [ "png", "jpeg", "jpg" ], // アップロードのバリデーションの為にacceptと両方必要
    maximalImagesCount: 1
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

export const userNameErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <span className="errorMessage">ユーザー名は必須です</span>;

    case "minLength": return <span className="errorMessage">
      {`ユーザー名は${userValidations.userName.minLength}~${userValidations.userName.maxLength}文字で入力してください`}</span>;

    case "maxLength": return <span className="errorMessage">
      {`ユーザー名は${userValidations.userName.minLength}~${userValidations.userName.maxLength}文字で入力してください`}</span>;
  }
}

