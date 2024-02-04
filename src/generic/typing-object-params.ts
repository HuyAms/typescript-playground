const returnBothOfWhatIPassIn = <T1, T2>(params: { a: T1; b: T2 }) => {
    return {
      first: params.a,
      second: params.b,
    };
  };

  const result = returnBothOfWhatIPassIn({a: "hello", b: "world"})