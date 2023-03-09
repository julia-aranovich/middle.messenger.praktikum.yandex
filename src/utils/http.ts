import {Indexed} from "./types";
import isPlainObject from "../data-utils/isPlainObject";
import isArrayOrObject from "../data-utils/isArrayOrObject";

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
  const result: [string, string][] = [];

  // eslint-disable-next-line no-restricted-syntax
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

  return getParams(data).map((arr) => arr.join("=")).join("&");
}

enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

type Options = {
  headers?: Record<string, string>;
  method?: Methods;
  timeout?: number;
  data?: Indexed;
};

type HTTPMethod = (url: string, options?: Omit<Options, "method">) => Promise<XMLHttpRequest>;

export default class HTTP {
  constructor(private _baseUrl: string) {}

  get: HTTPMethod = (
    url,
    options = {}
  ) => this.request(url, {...options, method: Methods.GET});

  post: HTTPMethod = (
    url,
    options = {}
  ) => this.request(url, {...options, method: Methods.POST});

  put: HTTPMethod = (
    url,
    options = {}
  ) => this.request(url, {...options, method: Methods.PUT});

  delete: HTTPMethod = (
    url,
    options = {}
  ) => this.request(url, {...options, method: Methods.DELETE});

  request(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    const {
      headers = {},
      method = Methods.GET,
      timeout = 5000,
      data
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data ?
          `${this._baseUrl}${url}${queryStringify(data)}` : `${this._baseUrl}${url}`
      );

      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
