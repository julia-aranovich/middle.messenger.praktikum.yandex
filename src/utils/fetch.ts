import {JSONObject} from "./types";

function queryStringify(obj: any, prefix?: string): string {
  if (typeof obj !== "object") {
    throw new Error("Query data must be object");
  }
  const result: string[] = [];
  Object.keys(obj).forEach((k: string): void => {
    const key = prefix ? `${prefix}[${k}]` : k;
    const value = obj[key] === null || obj[key] === undefined || Number.isNaN(obj[key]) ? "" : obj[key];
    result.push(typeof value === "object" ?
      queryStringify(value, key) :
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });
  return `${!prefix && "?"}${result.join("&")}`;
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
  data?: JSONObject;
};

type HTTPMethod = (url: string, options?: Omit<Options, "method">) => Promise<XMLHttpRequest>;

export default class HTTPTransport {
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

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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

type OptionsWithRetries = Options & {
  retries: number;
};

export function fetchWithRetry(url: string, options: OptionsWithRetries): Promise<XMLHttpRequest> {
  const {retries = 5, ...fetchOptions} = options;

  function onError() {
    if (retries === 1) {
      throw new Error("No retries left");
    }
    return fetchWithRetry(url, {...fetchOptions, ...{retries: retries - 1}});
  }

  return new HTTPTransport().request(url, fetchOptions).catch(onError);
}
