import { AxiosPromise } from "axios";

import UserType from "../config/types/accountTypes";
import ILoginResponse from "../config/types/loginResponse";
import IUser from "../config/types/user";
import API from "./api";
import { userInfo } from "os";

enum UserEndpoints {
  USERS = "/users",
  SELF = "/users/self",
  LOGIN = "/login",
  LOGOUT = "/logout",
  REGISTER = "/signup",
  RESEND_EMAIL = "/resend"
}

class UserAPI {
  private api: API;
  constructor() {
    this.api = new API("https://jobhub-authentication-staging.herokuapp.com");
    this.api.createEntities(Object.values(UserEndpoints));
  }

  public setJWT = (token: string) => {
    this.api.setJWT(token);
  };

  public clearJWT = () => {
    this.api.clearJWT();
  };

  public login = (payload: { email: string; password: string }) => {
    return this.api.endpoints[UserEndpoints.LOGIN]
      .create(payload)
      .then(({ data }) => {
        this.api.setJWT(data.token);
        return data as ILoginResponse;
      });
  };

  public logout = () => {
    return this.api.endpoints[UserEndpoints.LOGOUT].create({});
  };

  public register = (payload: {
    email: string;
    password: string;
    type: UserType;
  }) => {
    return this.api.endpoints[UserEndpoints.REGISTER].create(payload);
  };

  public update = (payload: {
    email: string;
    password: string;
    type: UserType;
  }) => {
    return this.api.endpoints[UserEndpoints.SELF].updateNoId(payload);
  };

  public delete = () => {
    return this.api.endpoints[UserEndpoints.SELF].deleteNoId();
  };

  public getSelf = () => {
    return this.api.endpoints[UserEndpoints.SELF].getAll() as AxiosPromise<
      IUser
    >;
  };

  public resendVerification = (payload: { email: string }) => {
    return this.api.endpoints[UserEndpoints.RESEND_EMAIL].create(payload);
  };
}

export default new UserAPI();
