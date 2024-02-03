// type AddRoutePrefix<TRoute> = `/${TRoute}`;

// The challenge here is that we need to ensure TRoute is a string
// we can do that using extends


type AddRoutePrefix<TRoute extends string> = `/${TRoute}`;

type AboutRoute = AddRoutePrefix<"about">