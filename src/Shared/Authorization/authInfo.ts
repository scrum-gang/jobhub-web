import ILoginResponse from "../../config/types/loginResponse";
import IUser from "../../config/types/user";

export default interface IAuthorizationInfo {
  userInfo?: IUser;
  token?: string;
  isLoading: boolean;
  clearStateAndCache: () => void;
  updateProvider: (response: ILoginResponse) => void;
}
