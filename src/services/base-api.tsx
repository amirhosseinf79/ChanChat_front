import responseType, { methodList } from "../types/response";

class Api {
  public api_url = "http://127.0.0.1:8000/api";

  public getUrl(path: `/${string}`) {
    return this.api_url + path;
  }

  public getToken() {
    const token = sessionStorage.getItem("token");
    return token;
  }

  public saveToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  public getOptions(method: methodList, fields: unknown) {
    const headers = new Headers();
    headers.append("Authentication", `Bearer ${this.getToken()}`);
    headers.append("content-type", "application/json");

    const options: RequestInit = {
      method,
      headers,
      body: JSON.stringify(fields),
    };
    return options;
  }

  public async validateData<T>(r: Response) {
    const data: responseType = {
      status: r.status,
      details: null,
      data: null,
    };
    if (r.status == 200 || r.status == 201 || r.status == 204) {
      const raw_data: T = await r.json();
      return { ...data, data: raw_data };
    } else if (r.status == 401) {
      throw { ...data, details: "unauthorised" };
    } else if (r.status == 403) {
      throw { ...data, datails: "forbidden" };
    } else {
      const raw_data = await r.json();
      throw { ...data, details: raw_data };
    }
  }
}

class ApiService extends Api {
  public async fetchApi<T>(method: methodList, url: `/${string}`, fields: T) {
    const options = this.getOptions(method, fields);
    const res = await fetch(this.getUrl(url), options);
    return await this.validateData(res);
  }
}

export default ApiService;
