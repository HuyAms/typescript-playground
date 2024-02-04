
type Fruit = "apple" | "banana" | "orange";

// this one check the whole ("apple" | "banana" | "orange") against ("apple" | "banana")
type AppleOrBanana = Fruit extends "apple" | "banana" ? Fruit : never;

// Solve using generic
type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;
type Result1 = GetAppleOrBanana<Fruit>