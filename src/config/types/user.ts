import accountType from "./accountTypes";

interface IUser {
  _id: string;
  email: string;
  password: string;
  type: accountType;
  verified: boolean;
  __v: number;
}

export default IUser;
