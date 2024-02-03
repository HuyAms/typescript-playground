/*
type CreateDataShape = {
  data: unknown;
  error: unknown;
};
*/ 

type CreateDataShape<TData, TError> = {
    data: TData;
    error: TError;
};

type Data = CreateDataShape<number, Error>