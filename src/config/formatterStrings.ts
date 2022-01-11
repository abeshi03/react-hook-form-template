// - 型定義 =============================================================================================================
import { genders, Genders } from "../types/User";

export const formatterStrings = {
  gender: function (gender: Genders) {
    switch (gender) {
      case genders.male: return "男";
      case genders.female: return "女";
      case genders.notSpecified: return "指定しない";
    }
  }
};
