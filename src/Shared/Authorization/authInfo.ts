import IUser from "../../config/types/user"

export default interface IAuthorizationInfo {
  userInfo?: IUser;
  sessionExpiry: Date;
  isLoading: boolean;
}
