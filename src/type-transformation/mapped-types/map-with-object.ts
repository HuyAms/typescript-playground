interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
  }
  
  type Keys = keyof Attributes

  type AttributeGetters = {
    [K in keyof Attributes]: () => Attributes[K]
  }