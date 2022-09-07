import { useRouter } from "next/router";

export const useRouterQuery = <QueryValues extends { [key: string]: any }>(
  valuesDefault: QueryValues
) => {
  const router = useRouter();

  return { ...valuesDefault, ...router.query } as QueryValues;
};
