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

// the word "extends" or "assignable to" means  a subset of, if you think about its possible values
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

## Apply Types to Entire Fucntion Expressions When Possible

Instead of

```ts
function add(a: number, b: number) {
  return a + b;
}
function sub(a: number, b: number) {
  return a - b;
}
function mul(a: number, b: number) {
  return a * b;
}
function div(a: number, b: number) {
  return a / b;
}
```

We can just do

```ts
type BinaryFn = (a: number, b: number) => number;

const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a / b;
```

Also let's say we are building a function on top of i.e `fetch`

```ts
async function checkedFetch(input: RequestInfo, init?: RequestInit) {}

// better
const checkedFetch: typeof fetch = async (input, init) => {};
```

## Avoid Including null or undefined in Type Aliases

Instead of

```ts
// here consumers will just asume User is not null
type User = {id: string; name: string} | null;
```

Do

```ts
type OptionalUser = {id: string; name: string} | null;

type NullableUser = {id: string; name: string} | null;
```

Values are easier to work with when they’re either completely null or completely non- null, rather than a mix. Avoid designs in which one value being null or not null is implicitly related to another value being null or not null.

Instead of

```ts
// Here user or posts can be null
class UserPosts {
  user: UserInfo | null;
  posts: Post[] | null;
  constructor() {
    this.user = null;
    this.posts = null;
  }
  async init(userId: string) {
    return Promise.all([
      async () => (this.user = await fetchUser(userId)),
      async () => (this.posts = await fetchPostsForUser(userId)),
    ]);
  }
  getUserName() {
    // ...?
  }
}
```

Do

```ts
// Now the UserPosts class is fully non-null
class UserPosts {
  user: UserInfo;
  posts: Post[];
  constructor(user: UserInfo, posts: Post[]) {
    this.user = user;
    this.posts = posts;
  }
  static async init(userId: string): Promise<UserPosts> {
    const [user, posts] = await Promise.all([fetchUser(userId), fetchPostsForUser(userId)]);
    return new UserPosts(user, posts);
  }
  getUserName() {
    return this.user.name;
  }
}
```

## Prefer Unions of Interfaces to Interfaces with Unions

Don't

```ts
interface Layer {
  layout: FillLayout | LineLayout | PointLayout;
  paint: FillPaint | LinePaint | PointPaint;
}
```

Do

```ts
interface FillLayer {
  type: 'fill';
  layout: FillLayout;
  paint: FillPaint;
}
interface LineLayer {
  type: 'line';
  layout: LineLayout;
  paint: LinePaint;
}
interface PointLayer {
  type: 'paint';
  layout: PointLayout;
  paint: PointPaint;
}

// tag union or discriminant union
type Layer = FillLayer | LineLayer | PointLayer;
```

Don't

```ts
interface Person {
  name: string;
  // These will either both be present or not be present placeOfBirth?: string;
  dateOfBirth?: Date;
}
```

Do

Consider whether multiple optional properties could be grouped to more accu‐ rately model your data.

```ts
interface Person {
  name: string;
  birth?: {
    place: string;
    date: Date;
  };
}

// OR
interface Name {
  name: string;
}
interface PersonWithBirth extends Name {
  placeOfBirth: string;
  dateOfBirth: Date;
}
type Person = Name | PersonWithBirth;
```

## Working with any

Prefer more precise forms of any

```ts
const a: any;

// more prefferable way to provide a more "precise" any
const a: any[];
const a: Record<string, any>;
```

Hide Unsafe Type Assertions in Well-Typed Functions

```ts
// checkedFetchJSON returns unknown

// Don't return unknown as it's gonna to speard out to the whole project
export async function fetchPeak(peakId: string): Promise<unknown> {
  return checkedFetchJSON(`/api/mountain-peaks/${peakId}`); // OK
}

// Do: Type Assertions in a function and return a well-typed response
export async function fetchPeak(peakId: string): Promise<MountainPeak> {
  return checkedFetchJSON(`/api/mountain-peaks/${peakId}`) as MountainPeak; // OK
}
```

## Object and Array look up

I found this very funny. So be careful

```ts
type IdToName = {[id: string]: string};
const ids: IdToName = {'007': 'James Bond'};

// agent is undefined but TS sees it as a string => this can cause a runtime error
const agent = ids['008'];
```

## Think of Generics as Functions Between Types

- In value-land, functions are one of the key ways to factor out repeated code. In type-land, the equivalent of a function is a generic type.

- Always need to think about how your generic type will behave with union types.

👉 Notes when working with Generic

- Type Parameters Should Appear Twice
- Type parameters are for relating the types of multiple values. If a type parameter is only used once in the function signature, it’s not relating anything.

**Rule:** If a type parameter only appears in one location, strongly reconsider if you actually need it.

👉 Example:

```ts
// The generic T appears twice after its declaration => it's good
// it describes that the return type is the same as arg
function identity<T>(arg: T): T {
  //           (decl.)    1    2 return arg;
}

// A, B appears only one => bad
function third<A, B, C>(a: A, b: B, c: C): C {
  return c;
}

// Better: Unneeded type parameters can often be replaced with the unknown type.
function third<C>(a: unknown, b: unknown, c: C): C {
  return c;
}

// T appears once
interface Lengthy {
  length: number;
}
function getLength<T extends Lengthy>(x: T) {
  return x.length;
}

// Better
function getLength(x: Lengthy) {
  return x.length;
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

Unions only distribute over conditional types if the condition is a bare type (T extends ...). So to prevent distribution, we need to com‐ plicate the expression a bit. The standard way to do this is to wrap T in a one-element tuple type, [T]

```ts
// to prevent distribution
type Comparable<T> = [T] extends [Date]
  ? Date | number
  : [T] extends [number]
  ? number
  : [T] extends [string]
  ? string
  : never;

let dateOrStr = Math.random() < 0.5 ? new Date() : 'A';
isLessThan(dateOrStr, 'B'); // should yield error
```

Conditional types have two other surprising behaviors that you should be aware of when they distribute over the boolean and never types

```ts
type CelebrateIfTrue<V> = V extends true ? 'Huzzah!' : never;

type SurpriseParty = CelebrateIfTrue<boolean>;
// ^? type SurpriseParty = "Huzzah!"
```

We wouldn't expect **boolean extends true to be true**. It's because boolean is a union.

```ts
type SurpriseParty
= CelebrateIfTrue<boolean>
= CelebrateIfTrue<true | false>
= CelebrateIfTrue<true> | CelebrateIfTrue<false> = "Huzzah!" | never
= "Huzzah!";

// we can prevent that
type CelebrateIfTrue<V> = [V] extends [true] ? 'Huzzah!' : never;
```

## Type Map pattern

How does TS know to return HTMLImageElement when you pass `img`

```ts
const img = document.querySelector('img'); // ^? const img: HTMLImageElement | null
```

It defines a map

```ts
interface HTMLElementTagNameMap {
  a: HTMLAnchorElement;
  abbr: HTMLElement;
  address: HTMLElement;
  area: HTMLAreaElement; // ... many more ... "video": HTMLVideoElement; "wbr": HTMLElement;
}

querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
```

## Types Display

```ts
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

interface BlogComment {
  commentId: number;
  title: string;
  content: string;
}

type PartComment = PartiallyPartial<BlogComment, 'title'>;
// // //
^? type PartComment =
       Partial<Pick<BlogComment, "title">> &
       Omit<BlogComment, "title">
```

Solution is to use the **Resolve**

```ts
type Resolve<T> = T extends Function ? T : {[K in keyof T]: T[K]};

type PartiallyPartial<T, K extends keyof T> = Resolve<Partial<Pick<T, K>> & Omit<T, K>>;

type PartComment = PartiallyPartial<BlogComment, 'title'>;
// ^? type PartComment = {
// title?: string | undefined;
// commentId: number;
// content: string;
// }
```

## Template Literal types

Template literal types offer a unique way for capturing patterns and relationships in strings.

```ts
// interesting usage of infer
type ToCamel<T extends string> = T extends `${infer Prefix}_${infer Suffix}`
  ? `${Prefix}${Capitalize<Suffix>}`
  : T;

type ObjectToCamel<T extends object> = {
  [K in keyof T as ToCamel<K & string>]: T[K];
};

function objectToCamel<T extends object>(obj: T): ObjectToCamel<T> {
  const out: any = {};
  for (const [k, v] of Object.entries(obj)) {
    out[camelCase(k)] = v;
  }
  return out;
}
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
