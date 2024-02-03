export type Maybe<T extends {}> = T | null | undefined;

// empty object in TS represents anything but null or undefined

// @ts-expect-error
type A = Maybe<null>