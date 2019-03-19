import { AxiosPromise } from "axios";

import API from "./api";

enum ApplicationEndpoints {
  APPLICATIONS = "/applications/user",
  SELF = "/users/self",
  LOGIN = "/login",
  LOGOUT = "/logout",
  REGISTER = "/signup",
  RESEND_EMAIL = "/resend"
}

class ApplicationsAPI {
  private api: API;

  /** Probably too late for this, but this.api probably should've been passed as a dependency injection */
  constructor() {
    this.api = new API("https://scrum-gang-job-applications.herokuapp.com/");
    this.api.createEntities(Object.values(ApplicationEndpoints));
  }

  public setJWT = (token: string) => {
    this.api.setJWT(token);
  };

  public clearJWT = () => {
    this.api.clearJWT();
  };

  public getApplicationsUser = (id: string) =>
    this.api.endpoints[ApplicationEndpoints.APPLICATIONS].getOne({ id });
}

export default new ApplicationsAPI();
