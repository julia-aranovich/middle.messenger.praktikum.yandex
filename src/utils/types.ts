export type Indexed<T = any> = {
  [k in string]: T;
};

export type ErrorWithReason = {reason: string};
