type Person = {
    name: string;
    age: number;
    birthdate: Date;
};
  
// first attempt: I added as Person[Key]
// but the idea is that TS should give us error when we return the wrong type!
// however, no way we could avoid that so we have to trust ourselves to return the value

export function remapPerson<Key extends keyof Person>(
    key: Key,
    value: Person[Key],
): Person[Key] {
    
    if (typeof key) {
      return new Date() as Person[Key];
    }
  
    return value;
}
  
const date = remapPerson("birthdate", new Date());
const num = remapPerson("age", 42);
const name = remapPerson("name", "John Doe");