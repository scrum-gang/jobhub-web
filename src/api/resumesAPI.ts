import API from "./api";
import { AxiosPromise } from "axios";

enum ApplicationEndpoints {
  GET_RESUMES = "/resumes",
  DELETE_RESUME = "/resumes",
  CREATE_RESUME = "/resumes"
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

  // "user_id": "5c955d38da317e001778643b",
	// "user_name": "",
	// "revision": "1",
	// "title": "test",
	// "resume_data":

  public createResumeUser = (payload: {
    resume_data: string;
    revision: string;
    title: string;
    user_id: string;
    user_name: string;
  }) => this.api.endpoints[ApplicationEndpoints.CREATE_RESUME].create(payload)

  public getResumesUser = (id: string) =>
    this.api.endpoints[ApplicationEndpoints.GET_RESUMES].getOne({ id });

  public deleteResumeUser = (id: string, title: string, revision: string) =>
    this.api.endpoints[ApplicationEndpoints.DELETE_RESUME].deleteResume({ id, title, revision });

  // public createResumeUser = (id: string, userName: string, revision: string, title: string, resumeData: string) =>
  //   this.api.endpoints[ApplicationEndpoints.CREATE_RESUME].createResume({ id, userName, revision, title, resumeData})
}

export default new ResumesAPI();
