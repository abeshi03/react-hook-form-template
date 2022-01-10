import { Genders } from "../types/User";

export const formatterStrings = {
  gender: function (gender: Genders) {
    switch (gender) {
      case Genders.male: return "男";
      case Genders.female: return "女";
      case Genders.notSpecified: return "指定しない";
    }
  }
};
