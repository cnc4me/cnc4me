export type OneOrMany<T> = T | T[];

export type ErrorHandler<E, R> = (err: E, result: R) => void;

export type WithInput<T, I> = T & { input: I };

export type WithResult<T, R> = T & { result: R };

export interface ErrorProducer<E> {
  hasErrors: boolean;
  getErrors(): E[];
}

export type PrefixObjectKeys<Prefix extends string, T> = {
  [K in keyof T as `${Prefix}:${string & K}`]: T[K];
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
