export type User = {
  uid: string;
  email: string;
  avatarImageURI?: string;
  userName: string;
  gender: Genders
}


// export enum Genders {
//   male = "MALE",
//   female = "FEMALE",
//   notSpecified = "NOT_SPECIFIED"
// }

export const genders = {
  male: "MALE",
  female: "FEMALE",
  notSpecified: "NOT_SPECIFIED"
} as const

export type Genders = typeof genders[keyof typeof genders];

