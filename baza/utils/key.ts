export const buildKeyFromParams = (params?: { [key: string]: any }) => {
  if (!params) {
    return "";
  }

  return Object.keys(params)
    .sort()
    .filter((key) =>
      ["string", "number", "boolean"].includes(typeof params[key])
    )
    .map((key) => `${key}:${params[key]}`)
    .join("_");
};
