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

## Literal Inference in Generics

Typescript infers different things in type arguments from things you pass to functions

Function that returns value only
```ts
const returnsValueOnly = <T>(t: T) => {
  return t
}

// result is inferred as "a"
const result = returnsValueOnly("a")
```

However, if we return an object
```ts
const returnsValueOnly = <T>(t: T) => {
  return {t}
}

// result is inferred as { t: string }
const result = returnsValueOnly("a")
```

😅 whattt!! It could be that the object can be modified, so Typescript infers it as string just for sure.

There is a really weird solution to fix this issue, using `extends string`
```ts
const returnsValueOnly = <T extends string>(t: T) => {
  return {t}
}

// result is inferred as { t: string }
const result = returnsValueOnly("a")
```

Same with an object param
```ts
const acceptsValueInAnObject = <T1>(obj: { input: T }) => {
  return obj.input
}

// const result2: string
const result2 = acceptsValueInAnObject({ input: "abc" })
```
Again, it's because we can modify the object. To fix this, we need to freeze that object using `as const`
```ts
const acceptsValueInAnObject = <T1>(obj: { input: T }) => {
  return obj.input
}

// const result2: string
const result2 = acceptsValueInAnObject({ input: "abc" } as const)

// or we can constraint it to a string
const acceptsValueInAnObject = <T1 extends string>(obj: { input: T }) => {
  return obj.input
}
```