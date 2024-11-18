import responseType, { methodList } from "../types/response";

class Api {
  public tmp_url = "api.smart-vip.ir";
  public base_url = "api.smart-vip.ir";
  public ws_url = "ws://" + this.base_url;
  public api_url = `http://${this.base_url}/api`;

  public getUrl(path: `/${string}`) {
    return this.api_url + path;
  }

  public getToken() {
    const token = sessionStorage.getItem("token");
    return token;
  }

  public getUser() {
    const user = sessionStorage.getItem("user");
    return user;
  }

  public saveToken(data: any) {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", data.user_id);
  }

  public getOptions(method: methodList, fields: unknown, token = true) {
    const headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${this.getToken()}`);
    headers.append("content-type", "application/json");

    const options: RequestInit = {
      method,
      headers,
    };
    if (fields) options.body = JSON.stringify(fields);

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
  public async fetchApi<T>(
    method: methodList,
    url: `/${string}`,
    fields: T | undefined,
    token: boolean
  ) {
    const raw_url = this.getUrl(url);
    const options = this.getOptions(method, fields, token);
    const res = await fetch(raw_url, options);
    return await this.validateData(res);
  }
}

export default ApiService;
