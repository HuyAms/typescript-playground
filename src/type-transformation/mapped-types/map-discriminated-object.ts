type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

  type RoutesObject = {
    [T in Route["route"]]: Extract<Route, {route: T}>["search"]
  }

  // more elegant way
  type RoutesObjectBetter = {
    [R in Route as R["route"]]: R["search"]
  }