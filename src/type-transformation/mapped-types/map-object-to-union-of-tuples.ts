interface Values {
    email: string;
    firstName: string;
    lastName: string;
  }
  
  type ValuesAsUnionOfTuples = {
    [K in keyof Values]: [K, Values[K]];
  }[keyof Values];
  