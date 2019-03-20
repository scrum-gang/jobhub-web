import { AxiosPromise } from "axios";

import API from "./api";

enum PostingEndpoints {
  POSTINGS = "/posting/",
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
}

export default new PostingAPI();
