export const buildKey = (params: { [key: string]: any }) => {
  return Object.keys(params)
    .sort()
    .filter((key) => ["string", "number"].includes(typeof params[key]))
    .map((key) => `${key}:${params[key]}`)
    .join("_");
};
