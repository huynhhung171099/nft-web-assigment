import { request, Variables } from "graphql-request";
export function doGraphqlRequest<TRequest, TResponse>(
  url: string,
  queryStr: string,
  variables?: TRequest
) {
  let err: Error | undefined;
  const execute = async () => {
    return request(url, queryStr, (variables as Variables) ?? undefined)
      .then(async (res) => {
        return res as TResponse;
      })
      .catch((e) => {
        err = e;
      });
  };
  return { url, err, execute };
}
