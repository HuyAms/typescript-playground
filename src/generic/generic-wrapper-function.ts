const makeSafe =
  <TParams extends any[], TReturn>(func: (...args: TParams) => TReturn) =>
  (
    ...args: TParams
  ):
    | {
        type: "success";
        result: TReturn;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };

  // Usage
  const func1 = makeSafe(() => 1);
  const result = func1();

  const func2 = makeSafe(() => {
    if (1 > 2) {
      return "123";
    }
    throw new Error("Oh dear");
  });

  const result2= func2();


  const func3 = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });
  const result3= func3(1, "hello");

