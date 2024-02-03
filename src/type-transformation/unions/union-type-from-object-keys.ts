const testingFrameworks = {
    vitest: {
      label: "Vitest",
    },
    jest: {
      label: "Jest",
    },
    mocha: {
      label: "Mocha",
    },
  };
  
  // We want to extract keys to a union type
  // hint: use keyof
  type TestingFramework = keyof typeof testingFrameworks;
