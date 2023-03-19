import {Indexed} from "./types";
import isPlainObject from "../helpers/isPlainObject";
import isArrayOrObject from "../helpers/isArrayOrObject";

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
  const result: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function queryStringify(data: Indexed) {
  if (!isPlainObject(data)) {
    throw new Error("input must be an object");
  }

  return `?${getParams(data).map((arr) => arr.join("=")).join("&")}`;
}

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

type Options = {
  method: Methods;
  data?: unknown;
};

export default class HTTP {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTP.API_URL}${endpoint}`;
  }

  get<Response>(url: string, data?: Record<string, string | number>): Promise<Response> {
    return this._request<Response>(url, {data, method: Methods.GET});
  }

  post<Response>(url: string, data?: unknown): Promise<Response> {
    return this._request<Response>(url, {data, method: Methods.POST});
  }

  put<Response>(url: string, data: unknown): Promise<Response> {
    return this._request<Response>(url, {data, method: Methods.PUT});
  }

  delete<Response>(url: string, data?: unknown): Promise<Response> {
    return this._request(url, {data, method: Methods.DELETE});
  }

  private _request<Response>(
    url: string,
    options: Options = {method: Methods.GET}
  ): Promise<Response> {
    const {method, data} = options;
    const isFormData = data instanceof FormData;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data ?
          `${this.endpoint}${url}${queryStringify(data)}` : `${this.endpoint}${url}`
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.timeout = 5000;
      xhr.onabort = () => reject({reason: "abort"});
      xhr.onerror = () => reject({reason: "network error"});
      xhr.ontimeout = () => reject({reason: "timeout"});

      if (!isFormData) xhr.setRequestHeader("Content-Type", "application/json");

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(isFormData ? data : JSON.stringify(data));
      }
    });
  }
}
