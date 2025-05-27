interface Person {
  name: string;
}
interface PossiblyAgedPerson extends Person {
  age?: number;
}
const p1 = {name: 'Serena', age: '42 years'};
const p2: Person = p1;
const p3: PossiblyAgedPerson = p2;
console.log(`${p3.name} is ${p3.age?.toFixed(1)} years old.`);
