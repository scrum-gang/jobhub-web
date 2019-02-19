import { AxiosPromise } from "axios";

import api from "./api";

import UserType from "../config/types/accountTypes";
import ILoginResponse from "../config/types/loginResponse";
import IUser from "../config/types/user";

enum UserEndpoints {
  USERS = "/users",
  SELF = "/users/self",
  LOGIN = "/login",
  REGISTER = "/signup",
  RESEND_EMAIL = "/resend"
}

class UserAPI {
  constructor() {
    api.createEntity(UserEndpoints.USERS);
    api.createEntity(UserEndpoints.SELF);
    api.createEntity(UserEndpoints.LOGIN);
    api.createEntity(UserEndpoints.REGISTER);
    api.createEntity(UserEndpoints.RESEND_EMAIL);
  }

  public login = (payload: { email: string; password: string }) => {
    return api.endpoints[UserEndpoints.LOGIN]
      .create(payload)
      .then(({ data }) => {
        api.setJWT(data.token);
        return data as ILoginResponse;
      });
  };

  public register = (payload: {
    email: string;
    password: string;
    type: UserType;
  }) => {
    return api.endpoints[UserEndpoints.REGISTER].create(payload);
  };

  public getSelf = () => {
    return api.endpoints[UserEndpoints.SELF].getAll() as AxiosPromise<IUser>;
  };

  public resendVerification = (payload: { email: string }) => {
    return api.endpoints[UserEndpoints.RESEND_EMAIL].create(payload);
  };
}

export default new UserAPI();
