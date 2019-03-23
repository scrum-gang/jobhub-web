import axios, {
  AxiosRequestConfig as AxiosCfg,
  AxiosInstance,
  AxiosPromise
} from "axios";

interface IOneParam {
  id: string;
}

interface IThreeParam {
  id: string;
  title: string;
  revision: string;
}

interface IEndpoints {
  getAll: (config?: AxiosCfg) => AxiosPromise;
  getOne: (params: IOneParam, config?: AxiosCfg) => AxiosPromise;
  create: (payload: any, config?: AxiosCfg) => AxiosPromise;
  update: (payload: any, config?: AxiosCfg) => AxiosPromise;
  updateNoId: (payload: any, config?: AxiosCfg) => AxiosPromise;
  patch: (params: IOneParam, payload: any, config?: AxiosCfg) => AxiosPromise;
  delete: (params: IThreeParam, config?: AxiosCfg) => AxiosPromise;
}

class API {
  public endpoints: { [endpoint: string]: IEndpoints };
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.endpoints = {};
    this.instance = axios.create({
      baseURL,
      timeout: 10000
    });
  }

  public createEntities = (entities: string[]) => {
    entities.forEach(entity => this.createEntity(entity));
  };

  public createEntity = (entityUrl: string) => {
    this.endpoints[entityUrl] = this.createCRUDEndpoints(entityUrl);
  };

  public setJWT = (token: string) => {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  public clearJWT = () => {
    this.instance.defaults.headers.common.Authorization = undefined;
  };

  private createCRUDEndpoints = (entityUrl: string) => {
    const endpoints: IEndpoints = {
      getAll: (config = {}) => this.instance.get(entityUrl, config),

      getOne: ({ id }: IOneParam, config = {}) =>
        this.instance.get(`${entityUrl}/${id}`, config),

      create: (payload: any, config = {}) =>
        this.instance.post(entityUrl, payload, config),

      update: (payload: any, config = {}) =>
        this.instance.put(`${entityUrl}/${payload.id}`, payload, config),

      updateNoId: (payload: any, config = {}) =>
        this.instance.put(entityUrl, payload, config),

      patch: ({ id }: IOneParam, payload: any, config = {}) =>
        this.instance.patch(`${entityUrl}/${id}`, payload, config),

      delete: ({ id, title, revision }: IThreeParam, config = {}) =>
        this.instance.delete(`${entityUrl}/${id}/${title}/${revision}`, config)
    };

    return endpoints;
  };
}

export default API;
