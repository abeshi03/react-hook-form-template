// - ライブラリー ========================================================================================================
import React from "react";
import { FieldError } from "react-hook-form";


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
    maximalImagesCount: 1
  }
};



// - エラーメッセージ =====================================================================================================
export const descriptionErrorMessage = (error: FieldError) => {
  switch (error.type) {

    case "required": return <span className="errorMessage">投稿内容は必須です</span>;

    case "minLength": return <span className="errorMessage">
      {`投稿内容は${postValidations.description.minLength}~${postValidations.description.maxLength}文字で入力してください`}</span>;

    case "maxLength": return <span className="errorMessage">
      {`投稿内容は${postValidations.description.minLength}~${postValidations.description.maxLength}文字で入力してください`}</span>;
  }
};

export const imageErrorMessage = (error: FieldError) => {
  switch (error.type) {

    case "required": return <span className="errorMessage">画像は必須です</span>;
  }
}
