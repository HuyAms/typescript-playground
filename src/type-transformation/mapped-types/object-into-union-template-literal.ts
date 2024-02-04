interface FruitMap {
    apple: "red";
    banana: "yellow";
    orange: "orange";
  }

  // expected: "apple:red" | "banana:yellow" | "orange:orange"
  type TransformedFruit = {
    [K in keyof FruitMap]: `${K}:${FruitMap[K]}`  
  }[keyof FruitMap];
