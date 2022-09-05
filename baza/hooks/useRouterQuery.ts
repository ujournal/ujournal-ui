import { useRouter } from "next/router";

export const useRouterQuery = <QueryValues extends { [key: string]: any }>(
  valuesDefault: QueryValues
) => {
  const keys = Object.keys(valuesDefault);
  const router = useRouter();

  return keys.reduce<QueryValues>((result, key) => {
    result[key as keyof QueryValues] =
      router.query[key] || (valuesDefault[key] as any);

    return result;
  }, {} as QueryValues);
};
