interface RouteQueryParams {
  '/': null;
  '/search': {query: string; language?: string};
}

function buildURL<K extends keyof RouteQueryParams>(route: K, params?: RouteQueryParams[K]) {
  return route + (params ? `?${new URLSearchParams(params)}` : '');
}
console.log(buildURL('/search', {query: 'do a barrel roll', language: 'en'}));
console.log(buildURL('/'));

buildURL('/search', {query: 'r', language: 'en'});
