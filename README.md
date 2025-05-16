# Typescript Playground

This is where I solve various TypeScript challenges 🚀

## Structural Typing

JavaScript is duck typed and TypeScript uses structural typing to model this: values assignable to your interfaces might have properties beyond those explicitly listed in your type declarations.

```ts
interface Vector2D {
  x: number;
  y: number;
}

function calculate(vector: Vector2D) {...}

const vector3D = {
 x: 10,
 y: 10,
 z: 10
}

// no complain as 3D conform 2D structure
// but this surely can lead to some bugs as z is not calculated
calculate(vector3D)
```

## Set of values

We need to think about Types as a set of values. The type of subset value

At the end of the day, much of what the type checker is doing is testing whether one set is a subset of another. You can assign a value to a type if the value is a member of that type’s set of possible values (subset)

For example

```ts
// holds no value, it's also called as a bottom type
type never

// the domain of this type is all values in JS, it's called a top type
type unknown

type N = number; // represents all numbers: 1, 2, 3, etc.
type A = 'a'; // a set with a single value: 'a'
type B = 'b'; // a set with a single value: 'b'

type AB = A | B; // union: values from A or B ('a' | 'b')
const ab1: AB = 'a'; // ✅
const ab2: AB = 'b'; // ✅

type ABnever = A & B; // intersection: must be both 'a' and 'b' at the same time — impossible
// So ABnever is `never`

interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}

// union, so a value just need to be a subset of Person or Lifespan
type PersonSpan = Person | Lifespan;

const ps: PersonSpan = {
  name: 'Alan',
  age: 12 //check structural typing, still valid Person
};

// intersect, so a value just need to be in both Person and Lifespan
type PersonSpan = Person & Lifespan;
const ps: PersonSpan = {
  name: 'Alan',
  birth: new Date('1902/06/23'),
};

// the word extends means  a subset of, if you think about its possible values
interface Vector1D {x: number}
interace Vector2D extends Vector1D {y: number} // Vector2D is a subset of Vector1D, so every values in 2D can assign to 1D
interace Vector3D extends Vector2D {z: number} // Vector3D is a subset of Vector2D

// meaning K is subset of string
function getKey<K extends string>(val: any, key: K)
```

| Type Concept                              | Set Theory Analogy                         |
| ----------------------------------------- | ------------------------------------------ |
| `never`                                   | ∅ (empty set)                              |
| Literal type                              | Single element set                         |
| Value assignable to `T`                   | `Value ∈ T` (value is a member of set `T`) |
| `T1` assignable to `T2` / `T1 extends T2` | `T1 ⊆ T2` (subset)                         |
| `T1 \| T2`                                | `T1 ∪ T2` (union)                          |
| `T1 & T2`                                 | `T1 ∩ T2` (intersection)                   |
| `unknown`                                 | Universal set (contains all values)        |

## Discriminated Unions vs. Unions

A discriminated union has something in common with whatever you’re representing. For example, if you’re working with an object you would have a common key.

```ts
// union
type B = 'a' | 'b' | 'c';

// descriminated union
type A =
  | {
      type: 'a';
      a: string;
    }
  | {
      type: 'b';
      b: string;
    }
  | {
      type: 'c';
      c: string;
    };

//enum
enum C {
  A = 'a',
  B = 'b',
  C = 'c',
}
```

## Type Helpers

It's like a function which can recieve params and returns a result.

Type Helpers can receive a type and transform it

```ts
type Maybe<T> = T | undefined | null;
```

## Distributive Property

When you have a conditional type and the type you are checking is a union, TypeScript will distribute the conditional type over each member of the union

```ts
type T = A | B | C;
type Result = T extends U ? X : Y;
```

Would result in

```ts
type Result = (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y);
```

## Literal Inference in Generics

Typescript infers different things in type arguments from things you pass to functions

Function that returns value only

```ts
const returnsValueOnly = <T>(t: T) => {
  return t;
};

// result is inferred as "a"
const result = returnsValueOnly('a');
```

However, if we return an object

```ts
const returnsValueOnly = <T>(t: T) => {
  return {t};
};

// result is inferred as { t: string }
const result = returnsValueOnly('a');
```

😅 whattt!! It could be that the object can be modified, so Typescript infers it as string just for sure.

There is a really weird solution to fix this issue, using `extends string`

```ts
const returnsValueOnly = <T extends string>(t: T) => {
  return {t};
};

// result is inferred as { t: string }
const result = returnsValueOnly('a');
```

Same with an object param

```ts
const acceptsValueInAnObject = <T1>(obj: {input: T}) => {
  return obj.input;
};

// const result2: string
const result2 = acceptsValueInAnObject({input: 'abc'});
```

Again, it's because we can modify the object. To fix this, we need to freeze that object using `as const`

```ts
const acceptsValueInAnObject = <T1>(obj: {input: T}) => {
  return obj.input;
};

// const result2: string
const result2 = acceptsValueInAnObject({input: 'abc'} as const);

// or we can constraint it to a string
const acceptsValueInAnObject = <T1 extends string>(obj: {input: T}) => {
  return obj.input;
};
```
