import { AxiosPromise } from "axios";

import API from "./api";

enum ApplicationEndpoints {
  GET_RESUMES = "/resumes"
}

class ResumesAPI {
  private api: API;

  /** Probably too late for this, but this.api probably should've been passed as a dependency injection */
  constructor() {
    this.api = new API(
      "https://cors-anywhere.herokuapp.com/https://resume-revision.herokuapp.com"
    );
    this.api.createEntities(Object.values(ApplicationEndpoints));
  }

  public setJWT = (token: string) => {
    this.api.setJWT(token);
  };

  public clearJWT = () => {
    this.api.clearJWT();
  };

  public getResumesUser = (id: string) =>
    this.api.endpoints[ApplicationEndpoints.GET_RESUMES].getOne({ id });
}

export default new ResumesAPI();
