// - ライブラリー ========================================================================================================
import React from "react";
import { FieldError } from "react-hook-form";

// - 子コンポーネント =====================================================================================================
import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";

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

  gender: {
    required: true
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
    case "required": return <ErrorMessage message="メールアドレスは必須です"/>;
    case "pattern": return <ErrorMessage message="不正なメールアドレスです。(正しい例: example@example.com)"/>;
  }
};

export const passwordErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <ErrorMessage message="パスワードは必須です"/>;

    case "minLength": return <ErrorMessage
      message={`パスワードは${userValidations.password.minLength}〜${userValidations.password.maxLength}文字で入力してください`}
    />;

    case "maxLength": return <ErrorMessage
      message={`パスワードは${userValidations.password.minLength}〜${userValidations.password.maxLength}文字で入力してください`}
    />;
  }
};

export const userNameErrorMessages = (error: FieldError) => {
  switch (error.type) {

    case "required": return <ErrorMessage message="ユーザー名は必須です"/>;

    case "minLength": return <ErrorMessage
      message={`ユーザー名は${userValidations.userName.minLength}~${userValidations.userName.maxLength}文字で入力してください`}
    />;

    case "maxLength": return <ErrorMessage
      message={`ユーザー名は${userValidations.userName.minLength}~${userValidations.userName.maxLength}文字で入力してください`}
    />;
  }
};

export const genderErrorMessages = (error: FieldError) => {
  switch (error.type) {
    case "required": return <ErrorMessage message="性別必須です"/>;
  }
}
