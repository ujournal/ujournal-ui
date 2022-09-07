import { useMemo } from "react";
import { useSite } from "./useSite";

export const useMyUserInfo = () => {
  const site = useSite();

  return useMemo(
    () => ({
      user: site.data?.my_user,
      isLoading: site.isLoading,
    }),
    [site.data?.my_user, site.isLoading]
  );
};
