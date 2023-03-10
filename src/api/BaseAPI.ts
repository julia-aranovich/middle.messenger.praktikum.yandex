import HTTP from "../utils/HTTP";

type ID = string | number;

export default abstract class BaseAPI {
  protected http: HTTP;

  protected constructor(endpoint: string) {
    this.http = new HTTP(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(
    data?: Record<string, string | number>,
    identifier?: ID
  ): Promise<unknown>;

  public abstract update?(data: unknown, identifier?: ID): Promise<unknown>;

  public abstract delete?(identifier: ID): Promise<unknown>;
}
