const array = [
    {
      name: "John",
    },
    {
      name: "Steve",
    },
  ];

// Let's type a reduce function
// There are 3 ways
const obj = array.reduce<Record<string, {name: string}>>((accum, item) => {
    accum[item.name] = item;
    return accum;
  }, {});

  const obj1 = array.reduce((accum: Record<string, {name: string}>, item) => {
    accum[item.name] = item;
    return accum;
  }, {});


  const obj2 = array.reduce((accum, item) => {
    accum[item.name] = item;
    return accum;
  }, {} as Record<string, {name: string}>);