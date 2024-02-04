# Typescript Playground

This is where I solve various TypeScript challenges 🚀

## Discriminated Unions vs. Unions

A discriminated union has something in common with whatever you’re representing. For example, if you’re working with an object you would have a common key.

```ts
// union
type B = "a" | "b" | "c";

// descriminated union
type A =
  | {
      type: "a";
      a: string;
    }
  | {
      type: "b";
      b: string;
    }
  | {
      type: "c";
      c: string;
    }

//enum
enum C {
  A = "a",
  B = "b",
  C = "c",
}
```
## Type Helpers
It's like a function which can recieve params and returns a result.

Type Helpers can receive a type and transform it

```ts
type Maybe<T> = T | undefined | null
```

## Distributive Property
When you have a conditional type and the type you are checking is a union, TypeScript will distribute the conditional type over each member of the union

```ts
type T = A | B | C
type Result = T extends U ? X : Y
```

Would result in 
```ts
type Result = (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
```

