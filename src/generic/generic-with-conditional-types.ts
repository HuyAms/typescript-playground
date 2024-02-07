// should return good bye when hello is passed in
// conditional type as returned type

// remove the as and you will see the error
// it's because typescript doesn't know what we return
// in this case, we know better than Typescript

type GreetingResult<TGreeting> = TGreeting extends "goodbye" ? "hello" : "goodbye"
function youSayGoodbyISayHello<TGreeting extends "hello" | "goodbye">
(greeting: TGreeting): GreetingResult<TGreeting>
{
    return (greeting === "goodbye" ? "hello" : "goodbye") as GreetingResult<TGreeting>
}

const goodbye = youSayGoodbyISayHello("hello")
const hello = youSayGoodbyISayHello("goodbye")