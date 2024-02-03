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




