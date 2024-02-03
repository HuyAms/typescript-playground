const makeQuery = (
    url: string,
    opts?: {
      method?: string;
      headers?: {
        [key: string]: string;
      };
      body?: string;
    },
) => {};
  
/**
 * How do we extract parameters from makeQuery?
 */
type MakeQueryParameters = Parameters<typeof makeQuery>;

// first param
type FirstParam = MakeQueryParameters[0]

// second param
type SecondParam = MakeQueryParameters[1]