import { AxiosPromise } from "axios";

import API from "./api";

enum ApplicationEndpoints {
  APPLICATIONS = "/applications/user/",
  APPLY_EXTERNAL = "/apply/external",
  UPDATE_STATUS_EXTERNAL = "/update/status",
  UPDATE_COMMENT = "/update/comment",
  CREATE_INTERVIEW_QUESTION = "/interview/question",
  GET_INTERVIEW_QUESTIONS = "/interview/question"
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
    this.api.endpoints[ApplicationEndpoints.APPLICATIONS].getAll();

  public getInterviewQuestionsForApplication = (id: string) =>
    this.api.endpoints[ApplicationEndpoints.GET_INTERVIEW_QUESTIONS].getOne({
      id
    });

  public createExternalApplication = (payload: {
    company: string;
    deadline: string;
    position: string;
    status: string;
    url: string;
    user_id: string;
  }) => this.api.endpoints[ApplicationEndpoints.APPLY_EXTERNAL].create(payload);

  public createInterviewQuestion = (payload: {
    application_id: number;
    question: string;
    title: string;
  }) =>
    this.api.endpoints[ApplicationEndpoints.CREATE_INTERVIEW_QUESTION].create(
      payload
    );

  public updateStatusExternalApplication = (payload: {
    id: number;
    new_status: string;
  }) =>
    this.api.endpoints[ApplicationEndpoints.UPDATE_STATUS_EXTERNAL].updateNoId(
      payload
    );

  public updateComment = (payload: { id: number; new_comment: string }) =>
    this.api.endpoints[ApplicationEndpoints.UPDATE_COMMENT].updateNoId(payload);
}

export default new ApplicationsAPI();
