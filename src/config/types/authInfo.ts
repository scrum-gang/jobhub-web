import IUser from "./user"

export default interface IAuthorizationInfo {
  userInfo?: IUser;
  sessionExpiry: Date;
  isLoading: boolean;
}
