// query GET_USER($id: ID!) {
//     user(id: $id) {
//       username
//       age
//     }
//   }

type OperationVariables = Record<string, any>;

export type FetchPolicy = 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'standby';

interface QueryFunctionOptions<
  TData = any,
  TVariables extends OperationVariables = OperationVariables
> {
  fetchPolicy?: FetchPolicy;
}

// extend QueryFunctionOptions - 💪 Here I learn how to extend the options and use default type
interface QueryHookOptions<TData = any, TVariables extends OperationVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  skip?: boolean;
  onCompleted?: (data: TData) => void;
}

type QueryResult<TData = any, TVariables extends OperationVariables = OperationVariables> = {
  data: TData | undefined;
  loading: boolean;
  error?: Error;
  variables?: TVariables;
};
//======

export type FetchUserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    username: string;
    age: number;
  };
};

export type FetchUserQueryVariables = {
  id: string;
};

type Options = QueryHookOptions<FetchUserQuery, FetchUserQueryVariables> &
  (
    | {
        variables: FetchUserQueryVariables;
        skip?: boolean;
      }
    | {
        skip: boolean;
      }
  );

// ==========

function useFetchUser(
  options: Options
): QueryResult<FetchUserQueryVariables, FetchUserQueryVariables> {
  // fetch user
  return {
    data: undefined,
    loading: false,
    error: undefined,
  };
}

// usage
useFetchUser({
  variables: {
    id: '1',
  },
  fetchPolicy: 'network-only',
});

// no need to provide variables when skip
useFetchUser({skip: true});
