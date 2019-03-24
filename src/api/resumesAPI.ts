import API from "./api";
import { AxiosPromise } from "axios";

enum ApplicationEndpoints {
  GET_RESUMES = "/resumes",
  DELETE_RESUME = "/resumes",
  CREATE_RESUME = "/resumes",
  PATCH_RESUME = "/resumes"
}

class ResumesAPI {
  private api: API;

  /** Probably too late for this, but this.api probably should've been passed as a dependency injection */
  constructor() {
    this.api = new API("https://resume-revision.herokuapp.com");
    this.api.createEntities(Object.values(ApplicationEndpoints));
  }

  public setJWT = (token: string) => {
    this.api.setJWT(token);
  };

  public clearJWT = () => {
    this.api.clearJWT();
  };

  public createResumeUser = (payload: {
    resume_data: string;
    revision: string;
    title: string;
    user_id: string;
    user_name: string;
    download_resume_url: string;
  }) => this.api.endpoints[ApplicationEndpoints.CREATE_RESUME].create(payload);

  public getResumesUser = (id: string) =>
    this.api.endpoints[ApplicationEndpoints.GET_RESUMES].getOne({ id });

  public deleteResumeUser = (id: string, title: string, revision: string) =>
    this.api.endpoints[ApplicationEndpoints.DELETE_RESUME].deleteResume({
      id,
      revision,
      title
    });

  public patchResumeRevision = (
    id: string,
    payload: {
      title: string;
      revision: string;
    }
  ) => this.api.endpoints[ApplicationEndpoints.PATCH_RESUME].patch({id}, payload);
}

export default new ResumesAPI();
