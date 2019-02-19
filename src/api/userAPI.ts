import { AxiosPromise } from "axios";

import api from "./api";

import UserType from "../config/types/accountTypes";
import ILoginResponse from "../config/types/loginResponse";
import IUser from "../config/types/user";

class UserAPI {
  constructor() {
    api.createEntity("/users");
    api.createEntity("/users/self");
    api.createEntity("/login");
    api.createEntity("/signup");
    api.createEntity("/resend");
  }

  public login = (payload: { email: string; password: string }) => {
    return api.endpoints["/login"].create(payload).then(({ data }) => {
      api.setJWT(data.token);
      return data as ILoginResponse;
    });
  };

  public register = (payload: {
    email: string;
    password: string;
    type: UserType;
  }) => {
    return api.endpoints["/signup"].create(payload);
  };

  public getSelf = () => {
    return api.endpoints["/users/self"].getAll() as AxiosPromise<IUser>;
  };

  public resendVerification = (payload: { email: string }) => {
    return api.endpoints["/resend"].create(payload);
  };
}

export default new UserAPI();
