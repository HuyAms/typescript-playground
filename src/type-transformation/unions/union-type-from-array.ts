// const fruits = ["apple", "banana", "orange"];

// first we want to freeze the array by using as const
const fruits = ["apple", "banana", "orange"] as const

type Fruit = typeof fruits[number];
type AppleOrBanana = Extract<Fruit,"banana" | "orange"> ;