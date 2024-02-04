
// pass hello return goodbye
// pass goodbye return hello
type YouSayGoodbyeAndISayHello<T extends "hello" | "goodbye"> = T extends "hello" ? "goodbye" : "hello";
type Hello = YouSayGoodbyeAndISayHello<"goodbye">
type GoodBye = YouSayGoodbyeAndISayHello<"hello">