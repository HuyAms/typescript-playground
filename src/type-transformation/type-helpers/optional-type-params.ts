/**
need to make TError optional, default undefined

type CreateDataShapeOptional<TData, TError> = {
    data: TData;
    error: TError;
};
*/

type MaybeError = Error | undefined

type CreateDataShapeOptional<TData = string, TError extends MaybeError = undefined> = {
    data: TData;
    error: TError;
};