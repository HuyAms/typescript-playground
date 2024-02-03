
type GetParametersAndReturnType<T extends (...args: any) => any> = {
  params: Parameters<T>;
  returnValue: ReturnType<T>;
};

type Result = GetParametersAndReturnType<() => string>
type Result1 = GetParametersAndReturnType<(s: string, n: number) => void>

