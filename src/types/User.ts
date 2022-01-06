export type User = {
  uid: string;
  email: string;
  avatarImageURI?: string;
  userName: string;
  gender: Genders
}


export enum Genders {
  male = "MALE",
  female = "FEMALE",
  notSpecified = "NOT_SPECIFIED"
}
