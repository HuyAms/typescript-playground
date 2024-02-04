
interface Attributes {
    firstName: string;
    lastName: string;
    age: number;
  }
  
type Keys = keyof Attributes

// use as
  type AttributeGetters = {
    [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K]
  }