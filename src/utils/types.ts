export type Indexed<T = any> = {
  [k in string]: T;
};
