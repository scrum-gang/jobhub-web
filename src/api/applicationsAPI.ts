import { AxiosPromise } from "axios";

import API from "./api";

enum ApplicationEndpoints {
  APPLICATIONS = "/applications/user",
  APPLY_EXTERNAL = "/apply/external"
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

  public createExternalApplication = (payload: {
    company: string;
    deadline: string;
    position: string;
    status: string;
    url: string;
    user_id: string;
  }) => this.api.endpoints[ApplicationEndpoints.APPLY_EXTERNAL].create(payload);
}

export default new ApplicationsAPI();
