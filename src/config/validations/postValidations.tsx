// - ライブラリー ========================================================================================================
import React from "react";
import { FieldError } from "react-hook-form";

// - 子コンポーネント =====================================================================================================
import { ErrorMessage } from "../../components/atoms/ErrorMessage/ErrorMessage";


// - バリデーション =======================================================================================================
export const postValidations = {

  description: {
    required: true,
    minLength: 1,
    maxLength: 1000
  },

  image: {
    required: true,
    accept: ".png, .jpeg",
    supportedImagesFileExtensions: [ "png", "jpeg", "jpg" ], // アップロードのバリデーションの為にacceptと両方必要
    maximalImagesCount: 1
  }
};



// - エラーメッセージ =====================================================================================================
export const descriptionErrorMessage = (error: FieldError) => {
  switch (error.type) {

    case "required": return <ErrorMessage message="投稿内容は必須です"/>;

    case "minLength": return <ErrorMessage
      message={`投稿内容は${postValidations.description.minLength}~${postValidations.description.maxLength}文字で入力してください`}
    />;

    case "maxLength": return <ErrorMessage
      message={`投稿内容は${postValidations.description.minLength}~${postValidations.description.maxLength}文字で入力してください`}
    />;
  }
};

export const imageErrorMessage = (error: FieldError) => {
  switch (error.type) {

    case "required": return <ErrorMessage message="画像は必須です"/>;
  }
}
