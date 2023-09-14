export const getSearchParams = (searchParams: URLSearchParams, paramName: string) => {
  return searchParams
    .get(paramName)
    ?.split(', ')
    .map((value) => value.slice(1, -1));
};
