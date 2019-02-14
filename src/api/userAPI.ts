import { AxiosPromise } from "axios";

import IUser from "../config/types/user";
import api from "./api";

class UserAPI {
  constructor() {
    api.createEntity("/users");
    api.createEntity("/users/self");
    api.createEntity("/login");
    api.createEntity("/signup");
  }

  public login = (payload: { email: string; password: string }) => {
    return api.endpoints["/login"].create(payload).then(({ data }) => {
      api.setJWT(data.token);
    });
  };

  public getSelf = () => {
    return api.endpoints["/users/self"].getAll() as AxiosPromise<IUser>;
  };
}

export default new UserAPI();
