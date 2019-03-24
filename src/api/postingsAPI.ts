import { AxiosPromise } from "axios";

import API from "./api";

enum PostingEndpoints {
  CREATE = "/posting/create",
  GET = "posting",
  GET_ALL = "posting/allpostings",
  DELETE = "/posting/id",
  GET_BY_RECRUITER = "posting/recruiter"
}

export interface IPosting {
  recruiter: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  company: string;
  requirements: string;
  deadline: string;
  start_date: string;
  end_date: string;
}

export interface IPosting2 extends IPosting {
  _id: string;
  posting_date: string;
}

class PostingAPI {
  private api: API;
  constructor() {
    this.api = new API("https://inhouse-jobpostings.herokuapp.com");
    this.api.createEntities(Object.values(PostingEndpoints));
  }

  public setJWT = (token: string) => {
    this.api.setJWT(token);
  };

  public clearJWT = () => {
    this.api.clearJWT();
  };

  public createPosting = (payload: IPosting) => {
    return this.api.endpoints[PostingEndpoints.CREATE].create(payload);
  };

  public getPostingById = (id: string) => {
    return this.api.endpoints[PostingEndpoints.GET].getOne({ id });
  };

  public deletePosting = (id: string) => {
    return this.api.endpoints[PostingEndpoints.DELETE].delete({ id });
  };

  public getPostingByRecruiter = (recruiterId: string) => {
    return this.api.endpoints[PostingEndpoints.GET_BY_RECRUITER].getOne({
      id: recruiterId
    });
  };

  public getAllPostings = () => {
    return this.api.endpoints[PostingEndpoints.GET_ALL].getAll();
  };
}

export default new PostingAPI();
